import { useState, useEffect, useCallback } from 'react'
import { getStats as apiGetStats } from '../services/api'

/**
 * useStats — fetches admin dashboard statistics
 */
export function useStats() {
  const [stats,     setStats]     = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error,     setError]     = useState(null)

  const fetchStats = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await apiGetStats()
      setStats(response.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load stats')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return { stats, isLoading, error, refetch: fetchStats }
}
