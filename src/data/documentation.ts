// ========================================
// HOW TO ADD NEW DOCUMENTATION - SIMPLE GUIDE
// ========================================
// Need detailed help? Check the file: HOW_TO_ADD_DOCS.md
//
// QUICK START:
// 1. Scroll down to "documentationData" array
// 2. Copy an existing tutorial
// 3. Change the id, title, category, and description
// 4. Update the steps with your content
// 5. Save the file - done!
//
// TIPS:
// - id: use-dashes-like-this (no spaces)
// - Add images: media: { image: "/images/your-pic.png" }
// - Add YouTube: media: { youtubeUrl: "your-youtube-link" }
// - Add notes: note: "Important reminder"
// - Add code: code: "your code here"

export interface MediaContent {
  image?: string;
  images?: string[];
  video?: string;
  youtubeUrl?: string;
  caption?: string;
}

export interface DocStep {
  id: string;
  title: string;
  content: string;
  code?: string;
  note?: string;
  media?: MediaContent;
}

export interface Documentation {
  id: string;
  title: string;
  category: string;
  description: string;
  steps: DocStep[];
}

export const documentationData: Documentation[] = [
  {
    id: "pixel-streaming-local",
    title: "How to do local pixel streaming test",
    category: "Unreal Engine",
    description: "Step-by-step guide to set up and test Unreal Engine Pixel Streaming locally",
    steps: [
      {
        id: "step-1",
        title: "Package your game",
        content: "First, package your Unreal Engine game for Windows. Make sure the packaging process completes successfully before proceeding to the next steps.",
      },
      {
        id: "step-2",
        title: "Navigate to WebServers directory",
        content: "Go to the following directory in your packaged game:",
        code: "C:\\package\\Windows\\Actions_Sample_V5_3\\Samples\\PixelStreaming\\WebServers",
      },
      {
        id: "step-3",
        title: "Run get_ps_servers.bat",
        content: "Execute the batch file to download required server components.",
        code: "get_ps_servers.bat",
        note: "The command window will vanish after a moment - this is normal behavior.",
      },
      {
        id: "step-4",
        title: "Navigate to SignallingWebServer",
        content: "Navigate to the platform scripts directory:",
        code: "C:\\package\\Windows\\Actions_Sample_V5_3\\Samples\\PixelStreaming\\WebServers\\SignallingWebServer\\platform_scripts\\cmd",
      },
      {
        id: "step-5",
        title: "Run the local server",
        content: "Execute the local server batch file:",
        code: "run_local.bat",
        note: "When Windows Firewall prompts, click 'Allow Access' and then minimize the window.",
      },
      {
        id: "step-6",
        title: "Create a project shortcut",
        content: "Create a shortcut to your packaged game executable. This will make it easier to launch with the required parameters.",
      },
      {
        id: "step-7",
        title: "Configure shortcut properties",
        content: "Right-click your shortcut and select Properties. In the Target field, after the .exe path, add a space and paste the following parameters:",
        code: "-log -AudioMixer -PixelStreamingIP=localhost -PixelStreamingPort=8888 -RenderOffscreen -AllowPixelStreamingCommands",
      },
      {
        id: "step-8",
        title: "Launch the application",
        content: "Run your configured shortcut. The application will start with pixel streaming enabled.",
      },
      {
        id: "step-9",
        title: "Open Chrome browser",
        content: "Open Google Chrome (or another Chromium-based browser) and navigate to:",
        code: "localhost",
      },
      {
        id: "step-10",
        title: "Success!",
        content: "Your local pixel stream should now be running. You can interact with your Unreal Engine application through the browser.",
      },
    ],
  },
  {
    id: "pixel-streaming-powershell",
    title: "Alternative: PowerShell Signalling Server",
    category: "Unreal Engine",
    description: "Advanced setup using PowerShell for the signalling server",
    steps: [
      {
        id: "ps-step-1",
        title: "PowerShell Command",
        content: "Use this PowerShell command for more control over the signalling server:",
        code: `PowerShell -NoProfile -ExecutionPolicy Bypass -Command "& 'DSTest2\\Samples\\PixelStreaming\\WebServers\\SignallingWebServer\\platform_scripts\\cmd\\Start_SignallingServer.ps1'" --UseMatchmaker=true --HttpPort 80 --StreamerPort 8888 --SFUPort 8889`,
      },
      {
        id: "ps-step-2",
        title: "Launch with AudioMixer",
        content: "Start your application with the following command:",
        code: "DSTest2.exe -AudioMixer -PixelStreamingIP=localhost -PixelStreamingPort=8888 -RenderOffscreen",
      },
    ],
  },
];

// Search function
export const searchDocumentation = (query: string): Array<{
  doc: Documentation;
  matchedSteps: DocStep[];
}> => {
  const lowercaseQuery = query.toLowerCase();
  const results: Array<{ doc: Documentation; matchedSteps: DocStep[] }> = [];

  documentationData.forEach((doc) => {
    const matchedSteps: DocStep[] = [];
    
    // Check if title or description matches
    const titleMatch = doc.title.toLowerCase().includes(lowercaseQuery);
    const descMatch = doc.description.toLowerCase().includes(lowercaseQuery);
    
    // Check each step
    doc.steps.forEach((step) => {
      const stepTitleMatch = step.title.toLowerCase().includes(lowercaseQuery);
      const stepContentMatch = step.content.toLowerCase().includes(lowercaseQuery);
      const stepCodeMatch = step.code?.toLowerCase().includes(lowercaseQuery);
      const stepNoteMatch = step.note?.toLowerCase().includes(lowercaseQuery);
      
      if (stepTitleMatch || stepContentMatch || stepCodeMatch || stepNoteMatch) {
        matchedSteps.push(step);
      }
    });
    
    if (titleMatch || descMatch || matchedSteps.length > 0) {
      results.push({ doc, matchedSteps });
    }
  });

  return results;
};
