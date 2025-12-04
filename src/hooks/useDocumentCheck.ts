import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UserDocument {
  id: string;
  filename: string;
  file_path: string;
  document_type: string | null;
  uploaded_at: string;
}

export function useDocumentCheck() {
  const { user } = useAuth();
  const [userDocuments, setUserDocuments] = useState<UserDocument[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserDocuments = useCallback(async () => {
    if (!user) {
      setUserDocuments([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('documents')
        .select('id, filename, file_path, document_type, uploaded_at')
        .eq('user_id', user.id)
        .is('permit_id', null)
        .is('intent_registration_id', null)
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      setUserDocuments(data || []);
    } catch (error) {
      console.error('Error fetching user documents:', error);
      setUserDocuments([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchUserDocuments();
  }, [fetchUserDocuments]);

  // Check if user has any documents in Document Management
  const hasDocumentsInManagement = userDocuments.length > 0;

  // Check if user has document by category/type
  const hasDocumentByType = useCallback((documentType: string): boolean => {
    return userDocuments.some(doc => doc.document_type === documentType);
  }, [userDocuments]);

  // Check if user has document by filename pattern
  const hasDocumentByName = useCallback((searchPattern: string): boolean => {
    const pattern = searchPattern.toLowerCase();
    return userDocuments.some(doc => 
      doc.filename.toLowerCase().includes(pattern)
    );
  }, [userDocuments]);

  // Get documents by type
  const getDocumentsByType = useCallback((documentType: string): UserDocument[] => {
    return userDocuments.filter(doc => doc.document_type === documentType);
  }, [userDocuments]);

  return {
    userDocuments,
    loading,
    hasDocumentsInManagement,
    hasDocumentByType,
    hasDocumentByName,
    getDocumentsByType,
    refreshDocuments: fetchUserDocuments,
  };
}
