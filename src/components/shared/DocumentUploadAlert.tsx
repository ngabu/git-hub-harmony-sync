import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { FileText, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DocumentUploadAlertProps {
  message?: string;
  showLink?: boolean;
  className?: string;
}

export function DocumentUploadAlert({ 
  message = "Please upload your documents to Document Management first before attaching them to this form.",
  showLink = true,
  className = ""
}: DocumentUploadAlertProps) {
  return (
    <Alert className={`bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800 ${className}`}>
      <FileText className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      <AlertDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <span className="text-amber-900 dark:text-amber-100">
          {message}
        </span>
        {showLink && (
          <Button variant="outline" size="sm" asChild className="border-amber-300 hover:bg-amber-100 dark:border-amber-700 dark:hover:bg-amber-900/50">
            <Link to="/dashboard?tab=documents" className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Go to Document Management
            </Link>
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}

interface DocumentRequiredAlertProps {
  documentType: string;
  hasDocument: boolean;
  className?: string;
}

export function DocumentRequiredAlert({ 
  documentType, 
  hasDocument, 
  className = "" 
}: DocumentRequiredAlertProps) {
  if (hasDocument) return null;

  return (
    <Alert className={`bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800 ${className}`}>
      <FileText className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      <AlertDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <span className="text-amber-900 dark:text-amber-100">
          Missing required document: <strong>{documentType}</strong>. Please upload it in Document Management first.
        </span>
        <Button variant="outline" size="sm" asChild className="border-amber-300 hover:bg-amber-100 dark:border-amber-700 dark:hover:bg-amber-900/50">
          <Link to="/dashboard?tab=documents" className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Upload Document
          </Link>
        </Button>
      </AlertDescription>
    </Alert>
  );
}
