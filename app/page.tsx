import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import Sidebar from "@/components/sidebar";
import { Card } from "@heroui/react";

export default function Home() {
  return (
    <div>
      <Sidebar/>
      <div className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto p-8">
          {selectedFile ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                  <FileText className="h-6 w-6" />
                  {selectedFile.filename}
                </h2>
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Summary</h3>
                  <p className="text-muted-foreground mb-6">
                    {selectedFile.summary}
                  </p>
                  <Separator className="my-4" />
                  <h3 className="text-lg font-semibold mb-3">Full Content</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap font-mono text-sm">
                      {selectedFile.content}
                    </pre>
                  </div>
                </Card>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[calc(100vh-200px)] text-muted-foreground">
              Select a note from the sidebar to view its content
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
