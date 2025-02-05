"use client"; 
import React, { useEffect, useState } from 'react';
import { Folder, FileText, RefreshCw, ChevronRight, List } from "lucide-react";
import { Card } from '@heroui/react';

interface NoteFile {
    filename: string;
    content: string;
    summary?: string;
  }

const Sidebar: React.FC = () => {
    const [files, setFiles] = useState<NoteFile[]>([]);
    const [selectedFile, setSelectedFile] = useState<NoteFile | null>(null);
    const [isLoadingFiles, setIsLoadingFiles] = useState(true);
  
    useEffect(() => {
      fetchNotes();
    }, []);
  
    const fetchNotes = async () => {
      try {
        const response = await fetch('/api/notes');
        const data = await response.json();
        const filesWithSummaries = data.map((file: NoteFile) => ({
          ...file,
          summary: generateSummary(file.content)
        }));
        setFiles(filesWithSummaries);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      } finally {
        setIsLoadingFiles(false);
      }
    };
  
    const generateSummary = (text: string) => {
      const sentences = text.split(/[.!?]+/).filter(Boolean);
      const keyPoints = sentences
        .filter(sentence => 
          sentence.length > 20 &&
          !sentence.toLowerCase().includes("um") &&
          !sentence.toLowerCase().includes("uh")
        )
        .map(sentence => sentence.trim())
        .slice(0, 3);
  
      return keyPoints.join(". ") + (keyPoints.length > 0 ? "." : "");
    };

    return (
        <div className="w-80 border-r bg-muted/30">
        <div className="p-4 border-b bg-background">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <List className="h-5 w-5" />
            Notes Summary
          </h1>
        </div>
          <div className="p-4 space-y-4">
            {isLoadingFiles ? (
              <div className="flex items-center justify-center h-20">
                <RefreshCw className="h-5 w-5 animate-spin" />
              </div>
            ) : files.length === 0 ? (
              <p className="text-muted-foreground text-center">
                No .txt files found
              </p>
            ) : (
              files.map((file) => (
                <Card
                  key={file.filename}
                  className={`p-4 cursor-pointer transition-colors hover:bg-accent ${
                    selectedFile?.filename === file.filename ? 'bg-accent' : ''
                  }`}
                  onClick={() => setSelectedFile(file)}
                >
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 mt-1 shrink-0" />
                    <div className="space-y-1 min-w-0">
                      <h3 className="font-medium truncate">{file.filename}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {file.summary || "No summary available"}
                      </p>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
      </div>
    );
};

export default Sidebar;