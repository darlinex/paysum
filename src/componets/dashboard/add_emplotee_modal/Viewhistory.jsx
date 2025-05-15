import React from 'react';
import './Viewhistory.css'; // You can use your custom CSS or adjust as needed

function Viewhistory({ onClose, downloadHistory }) {
  return (
    <div className="view-history h-screen w-screen fixed inset-0 backdrop-blur-sm flex justify-center items-center">
      <div className="modal-div rounded-md w-full max-w-5xl bg-white shadow-lg">
        <div className="view-history-header flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold">Download History</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            Close
          </button>
        </div>

        <table className="history-table w-full border-collapse rounded-lg overflow-hidden">
          <thead className="bg-[#E6EDF3] text-[#00294A] font-medium">
            <tr>
              <th className="p-3 text-left">Full Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Gross Pay</th>
              <th className="p-3 text-left">Deductions</th>
              <th className="p-3 text-left">Net Pay</th>
              <th className="p-3 text-left">Download Time</th>
            </tr>
          </thead>
          <tbody>
            {downloadHistory.length > 0 ? (
              downloadHistory.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="p-3">{item.fullName}</td>
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">{item.grossPay}</td>
                  <td className="p-3">{item.deductions}</td>
                  <td className="p-3">{item.netPay}</td>
                  <td className="p-3">{item.downloadTime}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-600">No history available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Viewhistory;
