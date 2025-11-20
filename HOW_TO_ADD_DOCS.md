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
category: "Game Engine"         ← Main category (top level in sidebar)
subcategory: "Unreal Engine"    ← Subcategory (optional, creates nested group)
subSubcategory: "Blueprints"    ← Sub-subcategory (optional, for deeper nesting)
description: "What this is"     ← Short summary (appears under title)
```

### Steps (The Main Content)
Each step becomes a numbered section (1. Creating the Socket, 2. Positioning, etc.)

**Basic step structure:**
```
id: "step-1"                    ← Unique ID for this step
title: "Creating the Socket"    ← Shows as "1. Creating the Socket"
content: "Your content here"    ← What to do (see formatting guide below)
```

## How to Format Your Content

The `content` field supports full Markdown formatting for professional documentation:

### Basic Text Formatting

**Line Breaks Between Paragraphs:**
```
content: "First paragraph here.\n\nSecond paragraph here."
```

**Bold Text** - Use `**double asterisks**`:
```
content: "Open the **Epic Games Launcher**."
```

**Inline Code** - Use `` `backticks` `` for commands, file paths, or values:
```
content: "Navigate to `\\UE_5.5\\Engine\\Extras\\Android`."
```

### Creating Structured Sections

**Main Subsection with Letter (A, B, C):**
```
content: "## A. Engine Installation\n\nDescription of this section."
```

**Numbered Lists:**
```
content: "1. Open the **Epic Games Launcher**.\n2. Install **Unreal Engine 5.5.4**.\n3. Check **Target Platforms: Android**."
```

**Bullet Points with Nested Items:**
```
content: "- **Location of Android SDK:** `C:/Users/[User]/AppData/Local/Android/Sdk`\n- **Location of Android NDK:**\n  - `C:/Users/[User]/AppData/Local/Android/Sdk/ndk/25.1.8937393`"
```

### Advanced Formatting Example

Here's how to create a richly formatted step like in your screenshot:

```typescript
{
  id: "step-3",
  title: "Unreal Engine 5.5 Setup",
  content: "## A. Engine Installation\n\n1. Open the **Epic Games Launcher**.\n2. Install **Unreal Engine 5.5.4**.\n3. In the Installation Options, ensure **Target Platforms: Android** (approx. 8.82 GB) is checked before installing.\n\n## B. Run Setup Script\n\n1. Navigate to your engine installation folder: `\\UE_5.5\\Engine\\Extras\\Android`.\n2. Right-click `SetupAndroid.bat` and select **Run as Administrator**.\n3. Wait for the script to succeed; it will download necessary support files and verify environment variables."
}
```

### Combining All Elements

You can mix and match:
- **Headings** for subsections (##, ###)
- **Numbered lists** for sequential steps
- **Bullet points** for options or details
- **Bold text** for UI elements and important terms
- **Inline code** for paths, commands, and values
- **Code blocks** using the separate `code:` field

**Example combining everything:**
```
content: "## A. Android SDK Settings\n\n1. Open your Unreal Engine project.\n2. Go to **Edit** > **Project Settings** > **Platforms** > **Android SDK**.\n3. Fill in the paths if they are not auto-detected:\n\n- **Location of Android SDK:** `C:/Users/[User]/AppData/Local/Android/Sdk`\n- **Location of Android NDK:**\n  - `C:/Users/[User]/AppData/Local/Android/Sdk/ndk/25.1.8937393`\n- **Location of JAVA:** `C:/Program Files/Java/jdk-17`"
```

## Real Example: Sockets Tutorial

Here's exactly how to write a tutorial like the one in your screenshot:

```typescript
{
  id: "add-sockets-unreal",
  title: "How to Add and Use Sockets in Unreal Engine",
  category: "Game Engine",
  subcategory: "Unreal Engine",
  subSubcategory: "Blueprints",
  description: "This guide covers the process of creating a socket on a skeletal mesh, positioning it, and attaching a component to it using Blueprints.",
  steps: [
    {
      id: "step-1",
      title: "Creating the Socket",
      content: "First, you need to add a socket to the bone where you want the attachment.\n\n1. Open your **Skeletal Mesh** asset (e.g., `Mesh_Arms`).\n2. In the **Skeleton Tree** panel, find and right-click the bone you want to attach an item to (e.g., `hand_r`).\n3. From the context menu, select **Add Socket**.\n4. A new socket will be created, parented to that bone. You can rename it (e.g., \"handSocket\")."
    },
    {
      id: "step-2",
      title: "Positioning and Previewing the Socket",
      content: "Once the socket is created, you must position it correctly. Using a preview asset helps you visualize the final placement.\n\n1. Right-click on your new socket (e.g., \"handSocket\") in the Skeleton Tree.\n2. Select **Add Preview Asset** and choose the mesh you plan to attach (e.g., a \"gun\").",
      note: "This preview mesh is only for alignment in the editor and will not appear in the game."
    },
    {
      id: "step-3",
      title: "Adjust Position and Rotation",
      content: "Select the socket and use the **translation (move)** and **rotation** gizmos in the viewport to adjust its position and orientation.\n\nTo ensure correct placement, you can select an animation (like a \"gun idle\") from the animation preview dropdown to see how it looks during gameplay.",
      media: {
        image: "/images/socket-positioning.png",
        caption: "Adjusting socket position with preview mesh"
      }
    }
  ]
}
```

**Key Formatting Notes from This Example:**
- Use `\n\n` between the intro text and numbered lists
- Bold important UI terms: `**Skeletal Mesh**`, `**Add Socket**`
- Use backticks for values: `` `Mesh_Arms` ``, `` `hand_r` ``
- Combine bold and backticks when needed
- The `note` field creates a highlighted warning box

### Optional Extras for Each Step

**Add Code Blocks:**
```
code: "YourCode.exe -parameter"
```
This creates a separate code block with copy button.

**Add Important Notes:**
```
note: "Remember to do this first!"
```
This creates a highlighted info box.

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
- Use **bold** for UI elements and menu names
- Use `backticks` for code, file names, and values
- Include YouTube videos for complex processes
- Write like you're teaching a friend
- Use subcategory and subSubcategory to organize related tutorials

❌ **DON'T:**
- Use spaces in IDs (use dashes: "my-tutorial" not "my tutorial")
- Forget commas between tutorials
- Skip the category
- Make steps too long
- Forget to use `\n\n` for line breaks in content

## Understanding Categories

The sidebar organizes tutorials in up to 3 levels:
- **Category**: Main topic (e.g., "Game Engine", "3D Software")
- **Subcategory**: Specific tool (e.g., "Unreal Engine", "Blender")
- **Sub-subcategory**: Feature area (e.g., "Animation", "Lighting", "Blueprints")

You can use just category, category + subcategory, or all three levels!

## Adding Images

1. Save your image files in the `public/images/` folder
2. Reference them as: `/images/your-image-name.png`
3. Use common formats: .png, .jpg, .gif

## Need Help?

- Check existing tutorials for examples
- Make sure all brackets `{ }` and quotes `" "` match
- Remember to escape special characters (use `\\` for backslashes)
- If something breaks, undo your changes and try again
- Test after each new tutorial you add
