import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import useNumber from '../index'

describe('useNumber', () => {
  it('should initialize with 0 by default', () => {
    const { result } = renderHook(() => useNumber())
    expect(result.current[0]).toBe(0)
  })

  it('should initialize with provided value', () => {
    const { result } = renderHook(() => useNumber(10))
    expect(result.current[0]).toBe(10)
  })

  it('should increment value', () => {
    const { result } = renderHook(() => useNumber(5))
    
    act(() => {
      result.current[1].increment()
    })
    
    expect(result.current[0]).toBe(6)
  })

  it('should decrement value', () => {
    const { result } = renderHook(() => useNumber(5))
    
    act(() => {
      result.current[1].decrement()
    })
    
    expect(result.current[0]).toBe(4)
  })

  it('should set value', () => {
    const { result } = renderHook(() => useNumber(5))
    
    act(() => {
      result.current[1].set(100)
    })
    
    expect(result.current[0]).toBe(100)
  })

  it('should handle multiple operations', () => {
    const { result } = renderHook(() => useNumber(0))
    
    act(() => {
      result.current[1].increment()
      result.current[1].increment()
      result.current[1].decrement()
    })
    
    expect(result.current[0]).toBe(1)
  })
})
