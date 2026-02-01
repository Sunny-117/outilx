import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import useMethods from '../index'

describe('useMethods', () => {
  const counterMethods = {
    increment: (state: number) => state + 1,
    decrement: (state: number) => state - 1,
    add: (state: number, value: number) => state + value,
    multiply: (state: number, value: number) => state * value,
  }

  it('should initialize with provided value', () => {
    const { result } = renderHook(() => useMethods(10, counterMethods))
    expect(result.current[0]).toBe(10)
  })

  it('should call increment method', () => {
    const { result } = renderHook(() => useMethods(5, counterMethods))
    
    act(() => {
      result.current[1].increment()
    })
    
    expect(result.current[0]).toBe(6)
  })

  it('should call decrement method', () => {
    const { result } = renderHook(() => useMethods(5, counterMethods))
    
    act(() => {
      result.current[1].decrement()
    })
    
    expect(result.current[0]).toBe(4)
  })

  it('should call method with arguments', () => {
    const { result } = renderHook(() => useMethods(5, counterMethods))
    
    act(() => {
      result.current[1].add(10)
    })
    
    expect(result.current[0]).toBe(15)
  })

  it('should handle multiple method calls', () => {
    const { result } = renderHook(() => useMethods(2, counterMethods))
    
    act(() => {
      result.current[1].multiply(3)
      result.current[1].add(4)
    })
    
    expect(result.current[0]).toBe(10)
  })

  it('should work with object state', () => {
    const objectMethods = {
      setName: (state: { name: string; age: number }, name: string) => ({ ...state, name }),
      setAge: (state: { name: string; age: number }, age: number) => ({ ...state, age }),
    }

    const { result } = renderHook(() => useMethods({ name: 'John', age: 20 }, objectMethods))
    
    act(() => {
      result.current[1].setName('Jane')
    })
    
    expect(result.current[0]).toEqual({ name: 'Jane', age: 20 })
    
    act(() => {
      result.current[1].setAge(25)
    })
    
    expect(result.current[0]).toEqual({ name: 'Jane', age: 25 })
  })
})
