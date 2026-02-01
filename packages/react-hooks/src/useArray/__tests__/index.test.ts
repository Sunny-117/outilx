import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import useArray from '../index'

describe('useArray', () => {
  it('should initialize with empty array by default', () => {
    const { result } = renderHook(() => useArray())
    expect(result.current[0]).toEqual([])
  })

  it('should initialize with provided array', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]))
    expect(result.current[0]).toEqual([1, 2, 3])
  })

  it('should push item to array', () => {
    const { result } = renderHook(() => useArray([1, 2]))
    
    act(() => {
      result.current[1].push(3)
    })
    
    expect(result.current[0]).toEqual([1, 2, 3])
  })

  it('should pop item from array', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]))
    
    act(() => {
      result.current[1].pop()
    })
    
    expect(result.current[0]).toEqual([1, 2])
  })

  it('should slice array', () => {
    const { result } = renderHook(() => useArray([1, 2, 3, 4, 5]))
    
    act(() => {
      result.current[1].slice(1, 3)
    })
    
    expect(result.current[0]).toEqual([2, 3])
  })

  it('should empty array', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]))
    
    act(() => {
      result.current[1].empty()
    })
    
    expect(result.current[0]).toEqual([])
  })

  it('should set new array', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]))
    
    act(() => {
      result.current[1].set([4, 5, 6])
    })
    
    expect(result.current[0]).toEqual([4, 5, 6])
  })

  it('should remove item from array', () => {
    const { result } = renderHook(() => useArray([1, 2, 3, 2]))
    
    act(() => {
      result.current[1].remove(2)
    })
    
    expect(result.current[0]).toEqual([1, 3, 2])
  })

  it('should remove item by id', () => {
    const { result } = renderHook(() => useArray([
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
      { id: 3, name: 'c' },
    ]))
    
    act(() => {
      result.current[1].removeById(2)
    })
    
    expect(result.current[0]).toEqual([
      { id: 1, name: 'a' },
      { id: 3, name: 'c' },
    ])
  })
})
