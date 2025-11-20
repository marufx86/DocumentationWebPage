# Documentation Examples - Advanced Formatting

This file contains copy-paste ready examples for different documentation styles.

## Example 1: Simple Tutorial (Basic Style)

```typescript
{
  id: "basic-tutorial",
  title: "How to Create a Blueprint",
  category: "Game Engine",
  subcategory: "Unreal Engine",
  subSubcategory: "Blueprints",
  description: "Quick guide to creating your first blueprint",
  steps: [
    {
      id: "step-1",
      title: "Open Content Browser",
      content: "In Unreal Engine, locate the **Content Browser** at the bottom of the screen.\n\nRight-click in an empty area and select **Blueprint Class**."
    },
    {
      id: "step-2",
      title: "Choose Parent Class",
      content: "Select **Actor** as the parent class and give it a name like `BP_MyFirstBlueprint`."
    }
  ]
}
```

## Example 2: Advanced Setup Guide (Your Style)

```typescript
{
  id: "unreal-android-setup",
  title: "Unreal Engine 5.5 Setup for Android",
  category: "Game Engine",
  subcategory: "Unreal Engine",
  subSubcategory: "Setup",
  description: "Complete setup guide for Android development in Unreal Engine 5.5",
  steps: [
    {
      id: "step-1",
      title: "Prerequisites",
      content: "Before starting, ensure you have:\n\n- Windows 10/11 (64-bit)\n- At least 100 GB free disk space\n- Administrator access\n- Stable internet connection"
    },
    {
      id: "step-2",
      title: "Engine Installation",
      content: "## A. Download and Install\n\n1. Open the **Epic Games Launcher**.\n2. Navigate to the **Unreal Engine** tab.\n3. Click **Install Engine** and select version **5.5.4**.\n4. In the Installation Options, ensure **Target Platforms: Android** (approx. 8.82 GB) is checked before installing.\n\n## B. Verify Installation\n\n1. Wait for the installation to complete.\n2. Launch the engine to verify it opens correctly.\n3. Close the engine before proceeding to Android setup."
    },
    {
      id: "step-3",
      title: "Android SDK Configuration",
      content: "## A. Run Setup Script\n\n1. Navigate to your engine installation folder: `\\UE_5.5\\Engine\\Extras\\Android`.\n2. Right-click `SetupAndroid.bat` and select **Run as Administrator**.\n3. Wait for the script to succeed; it will download necessary support files and verify environment variables.\n\n## B. Configure Project Settings\n\n1. Open your Unreal Engine project.\n2. Go to **Edit** > **Project Settings** > **Platforms** > **Android SDK**.\n3. Fill in the paths if they are not auto-detected:\n\n- **Location of Android SDK:** `C:/Users/[User]/AppData/Local/Android/Sdk`\n- **Location of Android NDK:**\n  - `C:/Users/[User]/AppData/Local/Android/Sdk/ndk/25.1.8937393`\n- **Location of JAVA:** `C:/Program Files/Java/jdk-17`\n- **SDK API Level:** `android-34`\n- **NDK API Level:** `android-25`",
      note: "Replace [User] with your actual Windows username in the paths above."
    },
    {
      id: "step-4",
      title: "Test Your Setup",
      content: "## A. Create Test Project\n\n1. Create a new **Third Person** project.\n2. Enable **Android** platform in project settings.\n\n## B. Package for Android\n\n1. Go to **File** > **Package Project** > **Android**.\n2. Select output directory.\n3. Wait for packaging to complete (first time may take 10-15 minutes).",
      media: {
        youtubeUrl: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
        caption: "Video walkthrough of the packaging process"
      }
    }
  ]
}
```

## Example 3: Code-Heavy Tutorial

```typescript
{
  id: "pixel-streaming-advanced",
  title: "Advanced Pixel Streaming Configuration",
  category: "Game Engine",
  subcategory: "Unreal Engine", 
  subSubcategory: "Pixel Streaming",
  description: "Advanced configuration options for Pixel Streaming with custom parameters",
  steps: [
    {
      id: "step-1",
      title: "Server Configuration",
      content: "## A. Configure Signalling Server\n\nEdit the `config.json` file with these settings:\n\n- **Port:** `8888`\n- **SSL:** `false` (for local testing)\n- **Streamer Port:** `8889`",
      code: `{
  "UseFrontend": false,
  "UseMatchmaker": false,
  "UseHTTPS": false,
  "HTTPSCertFile": "",
  "StreamerPort": 8889,
  "SFUPort": 8889,
  "MaxPlayerCount": -1
}`
    },
    {
      id: "step-2",
      title: "Launch Parameters",
      content: "## A. Required Parameters\n\nAdd these to your shortcut target:\n\n- `-PixelStreamingIP=localhost` - Server IP\n- `-PixelStreamingPort=8888` - Connection port\n- `-RenderOffscreen` - Headless rendering\n- `-AudioMixer` - Audio support\n\n## B. Optional Performance Parameters\n\n- `-ResX=1920 -ResY=1080` - Resolution\n- `-FPS=60` - Frame rate cap",
      code: "YourGame.exe -AudioMixer -PixelStreamingIP=localhost -PixelStreamingPort=8888 -RenderOffscreen -ResX=1920 -ResY=1080 -FPS=60"
    }
  ]
}
```

## Example 4: Visual Tutorial with Multiple Images

```typescript
{
  id: "material-setup",
  title: "Creating PBR Materials",
  category: "Game Engine",
  subcategory: "Unreal Engine",
  subSubcategory: "Materials",
  description: "Step-by-step guide to creating physically-based rendering materials",
  steps: [
    {
      id: "step-1",
      title: "Create Material",
      content: "## A. Create New Material\n\n1. Right-click in **Content Browser**\n2. Select **Material**\n3. Name it `M_PBR_Master`\n\n## B. Open Material Editor\n\nDouble-click the material to open the editor.",
      media: {
        images: [
          "/images/create-material.png",
          "/images/material-editor.png"
        ],
        caption: "Material creation and editor interface"
      }
    },
    {
      id: "step-2",
      title: "Connect Texture Maps",
      content: "Connect your texture maps:\n\n- **Base Color** - Albedo map\n- **Roughness** - Roughness map (grayscale)\n- **Metallic** - Metallic map (grayscale)\n- **Normal** - Normal map (ensure it's set to Normal type)",
      media: {
        image: "/images/texture-connections.png",
        caption: "Proper texture map connections"
      },
      note: "Make sure to set the Normal map texture's compression settings to 'Normal Map' in the texture properties."
    }
  ]
}
```

## Formatting Tips Summary

### For Clean, Professional Docs:

1. **Use subsections (## A., ## B.)** to break up long steps
2. **Bold UI elements** like menu names and button labels
3. **Use inline code** for paths, commands, and specific values
4. **Use code blocks** (separate `code:` field) for multi-line code
5. **Add notes** for warnings or important reminders
6. **Include media** for visual steps
7. **Keep paragraphs short** - use `\n\n` to separate

### Character Escaping:

- Backslashes in paths: `\\UE_5.5\\Engine\\Extras\\Android`
- Quotes in text: Use `\"` or switch to single quotes
- Special characters in code blocks: No escaping needed in the `code:` field

### Markdown Cheat Sheet:

```
**Bold text**
`Inline code`
## Heading level 2
### Heading level 3
1. Numbered list
- Bullet point
  - Nested bullet (2 spaces)
\n\n = New paragraph
```
