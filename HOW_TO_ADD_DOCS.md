# How to Add New Documentation - Simple Guide

This guide will help you add new tutorials to your documentation website. No coding knowledge needed!

## Quick Steps

1. Open the file: `src/data/documentation.ts`
2. Find the section that starts with `export const documentationData`
3. Copy one of the existing tutorials
4. Change the information to match your new tutorial
5. Save the file

That's it! Your new tutorial will appear automatically.

## Understanding the Structure

Each tutorial has these parts:

### Basic Information
```
id: "my-tutorial-name"          ← URL-friendly name (use dashes, no spaces)
title: "My Tutorial Name"       ← What users see
category: "Unreal Engine"       ← Group it belongs to
description: "What this is"     ← Short summary
```

### Steps
Each step has:
```
id: "step-1"                    ← Unique ID for this step
title: "Do This First"          ← Step title
content: "Explanation here"     ← What to do
```

### Optional Extras for Each Step

**Add Code:**
```
code: "YourCode.exe -parameter"
```

**Add Important Notes:**
```
note: "Remember to do this first!"
```

**Add Images:**
```
media: {
  image: "/images/screenshot.png",
  caption: "What this shows"
}
```

**Add Multiple Images:**
```
media: {
  images: [
    "/images/screen1.png",
    "/images/screen2.png"
  ],
  caption: "Setup screens"
}
```

**Add YouTube Videos:**
```
media: {
  youtubeUrl: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
  caption: "Video walkthrough"
}
```

## Example: Complete Tutorial

```typescript
{
  id: "install-unreal",
  title: "How to Install Unreal Engine",
  category: "Unreal Engine",
  description: "Complete guide to installing Unreal Engine on Windows",
  steps: [
    {
      id: "step-1",
      title: "Download Epic Games Launcher",
      content: "Go to the Epic Games website and download the launcher",
      media: {
        image: "/images/epic-download.png",
        caption: "Download button location"
      }
    },
    {
      id: "step-2",
      title: "Install the Launcher",
      content: "Run the installer and follow the instructions",
      note: "Make sure you have admin rights!"
    },
    {
      id: "step-3",
      title: "Download Unreal Engine",
      content: "Open the launcher and go to the Unreal Engine tab",
      code: "C:\\Program Files\\Epic Games\\",
      media: {
        youtubeUrl: "https://www.youtube.com/watch?v=EXAMPLE"
      }
    }
  ]
}
```

## Where to Put Your Tutorial

Inside `documentationData`, add a comma after the last tutorial, then paste your new tutorial.

Look for this pattern:
```typescript
export const documentationData: Documentation[] = [
  {
    // Tutorial 1
  },
  {
    // Tutorial 2
  },
  // Add your new tutorial here!
  {
    // Your new tutorial
  }
];
```

## Tips

✅ **DO:**
- Use clear, descriptive titles
- Break complex tasks into small steps
- Add screenshots for visual steps
- Include YouTube videos for complex processes
- Write like you're teaching a friend

❌ **DON'T:**
- Use spaces in IDs (use dashes: "my-tutorial" not "my tutorial")
- Forget commas between tutorials
- Skip the category
- Make steps too long

## Adding Images

1. Save your image files in the `public/images/` folder
2. Reference them as: `/images/your-image-name.png`
3. Use common formats: .png, .jpg, .gif

## Need Help?

- Check existing tutorials for examples
- Make sure all brackets `{ }` and quotes `" "` match
- If something breaks, undo your changes and try again
- Test after each new tutorial you add
