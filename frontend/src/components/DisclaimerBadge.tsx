import React from 'react';
import { AlertCircle } from 'lucide-react';

export const DisclaimerBadge: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-center space-x-1.5 text-[11px] text-[#4B5A50] bg-[#E5EDE5]/60 px-2 py-1 rounded border border-[#E5EDE5]">
        <AlertCircle className="w-3.5 h-3.5 text-[#197B5A] shrink-0" />
        <span>Grounded legal intelligence. Does not constitute formal advocate opinion or guaranteed patent grant.</span>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F5EF] border-l-4 border-[#C6A45B] p-3 rounded-r-lg text-xs text-[#202923] space-y-1">
      <div className="flex items-center space-x-1.5 font-semibold text-[#123C32]">
        <AlertCircle className="w-4 h-4 text-[#C6A45B]" />
        <span>Official Statutory Research & Non-Advisory Notice</span>
      </div>
      <p className="text-[11px] text-[#4B5A50] leading-relaxed">
        IP-SAKTI Sahayak provides objective statutory retrieval and classification intelligence for preliminary research and compliance orientation.
        It does not grant legal representation, nor does it guarantee patent issuance by the Indian Patent Office (IPO) or license approval by State AYUSH Authorities.
        Final filings should be reviewed with qualified legal counsel and regulatory specialists.
      </p>
    </div>
  );
};
