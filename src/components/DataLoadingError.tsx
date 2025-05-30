import  { AlertCircle, RefreshCw } from 'lucide-react';

interface DataLoadingErrorProps {
  message?: string;
  onRetry?: () => void;
}

const DataLoadingError: React.FC<DataLoadingErrorProps> = ({ 
  message = "We encountered a problem loading your data.", 
  onRetry 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 border border-red-100 rounded-lg bg-red-50 text-center my-6">
      <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
      <p className="text-gray-800 mb-4">{message}</p>
      
      {onRetry && (
        <button 
          onClick={onRetry}
          className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-800"
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Try again
        </button>
      )}
    </div>
  );
};

export default DataLoadingError;
 