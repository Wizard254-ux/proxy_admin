import  { useState, useEffect } from 'react';
import { RefreshCw, Power, PowerOff } from 'lucide-react';
import axios from 'axios';

const ProxyDataDashboard = () => {
  const [data, setData] = useState<{id:number,code:string,'owner':string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [proxyEnabled, setProxyEnabled] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(false);

  // Fetch data function
  const fetchData = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await axios.get('https://mutaihillary27.pythonanywhere.com/api/pass/proxy');
      setData(response.data);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle proxy function
  const toggleProxy = async () => {
    setToggleLoading(true);
    try {
      const newProxyState = !proxyEnabled;
      
      // Replace with your actual API endpoint
      await axios.put('https://mutaihillary27.pythonanywhere.com/api/pass/proxy', { proxy: newProxyState ? 1 : 0 });
      
      // Simulating API call
      setProxyEnabled(newProxyState);
      
      console.log('Proxy toggled:', { proxy: newProxyState ? 1 : 0 });
    } catch (error) {
      console.error('Error toggling proxy:', error);
    } finally {
      setToggleLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Truncate long codes for mobile display
  const truncateCode = (code:any, maxLength = 30) => {
    return code.length > maxLength ? `${code.substring(0, maxLength)}...` : code;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Proxy Dashboard
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Reload Button */}
              <button
                onClick={fetchData}
                disabled={loading}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Reload
              </button>
              
              {/* Proxy Toggle Button */}
              <button
                onClick={toggleProxy}
                disabled={toggleLoading}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${
                  proxyEnabled
                    ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                    : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                }`}
              >
                {proxyEnabled ? (
                  <Power className="h-4 w-4 mr-2" />
                ) : (
                  <PowerOff className="h-4 w-4 mr-2" />
                )}
                Proxy {proxyEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Data Records ({data.length})
            </h2>
            
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
                <span className="ml-2 text-gray-600">Loading data...</span>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden sm:block">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Code
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Owner
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.id}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              <span className="font-mono break-all">
                                {item.code}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                {item.owner}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile Cards */}
                <div className="sm:hidden space-y-4">
                  {data.map((item) => (
                    <div key={item.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium text-gray-900">
                          ID: {item.id}
                        </span>
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {item.owner}
                        </span>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 mb-1">Code:</p>
                        <p className="text-sm font-mono text-gray-900 break-all bg-white p-2 rounded border">
                          {truncateCode(item.code, 50)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {data.length === 0 && !loading && (
              <div className="text-center py-8">
                <p className="text-gray-500">No data available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProxyDataDashboard;