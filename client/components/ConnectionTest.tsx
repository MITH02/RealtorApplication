import React, { useState } from 'react';
import { apiService } from '../services/api';

const ConnectionTest: React.FC = () => {
  const [results, setResults] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const runTests = async () => {
    setIsLoading(true);
    const newResults: Record<string, string> = {};

    try {
      // Test ping
      try {
        await apiService.testPing();
        newResults.ping = '✅ SUCCESS';
      } catch (error) {
        newResults.ping = `❌ FAILED: ${error instanceof Error ? error.message : 'Unknown error'}`;
      }

      // Test health
      try {
        await apiService.testHealth();
        newResults.health = '✅ SUCCESS';
      } catch (error) {
        newResults.health = `❌ FAILED: ${error instanceof Error ? error.message : 'Unknown error'}`;
      }

      // Test CORS
      try {
        await apiService.testCors();
        newResults.cors = '✅ SUCCESS';
      } catch (error) {
        newResults.cors = `❌ FAILED: ${error instanceof Error ? error.message : 'Unknown error'}`;
      }

      // Test auth endpoint (should work without authentication)
      try {
        await apiService.testAuth();
        newResults.auth = '✅ SUCCESS';
      } catch (error) {
        newResults.auth = `❌ FAILED: ${error instanceof Error ? error.message : 'Unknown error'}`;
      }

    } catch (error) {
      console.error('Test error:', error);
    } finally {
      setIsLoading(false);
      setResults(newResults);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Backend Connection Test</h3>
      
      <button
        onClick={runTests}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 mb-4"
      >
        {isLoading ? 'Running Tests...' : 'Run Connection Tests'}
      </button>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Ping Test:</span>
          <span className={results.ping?.includes('✅') ? 'text-green-600' : 'text-red-600'}>
            {results.ping || '⏳ Not tested'}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Health Check:</span>
          <span className={results.health?.includes('✅') ? 'text-green-600' : 'text-red-600'}>
            {results.health || '⏳ Not tested'}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>CORS Test:</span>
          <span className={results.cors?.includes('✅') ? 'text-green-600' : 'text-red-600'}>
            {results.cors || '⏳ Not tested'}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Auth Endpoint Test:</span>
          <span className={results.auth?.includes('✅') ? 'text-green-600' : 'text-red-600'}>
            {results.auth || '⏳ Not tested'}
          </span>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-100 rounded text-sm">
        <p><strong>Expected Results:</strong></p>
        <ul className="list-disc list-inside mt-1">
          <li>All tests should show ✅ SUCCESS</li>
          <li>If any test fails, check the backend console for errors</li>
          <li>Make sure the backend is running on port 8082</li>
        </ul>
      </div>
    </div>
  );
};

export default ConnectionTest;
