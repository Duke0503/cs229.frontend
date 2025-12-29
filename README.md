# FOL Query Processor - Logic Demo

Modern web interface for visualizing First-Order Logic query processing pipeline.

## ✨ Features

### 🎨 Beautiful Modern UI

- **Gradient backgrounds** with purple/pink theme
- **Glassmorphism effects** for cards and panels
- **Smooth animations** throughout the interface
- **Interactive hover states** on all components
- **Custom scrollbar** styling

### 🔄 Step-by-Step Pipeline Visualization

- **Animated pipeline** that reveals each processing step gradually
- **Adjustable animation speed** (0-2000ms between steps)
- **Tree view** for complex nested structures (functor/args)
- **Toggle between JSON and Tree view** for better readability
- **Collapsible nodes** in tree visualization
- **Visual indicators** for active processing step

### 📊 Data Visualization

- **TreeVisualizer**: Interactive tree view for complex nested objects
- **Syntax highlighting** for different data types
- **Expandable/collapsible** sections
- **Color-coded** functor nodes and arguments

### 🎯 User Experience

- **Demo questions** pre-loaded from backend
- **Custom question input** with keyboard support (Enter to run)
- **Real-time progress** indicators
- **Error handling** with clear messages
- **Responsive design** that works on all screen sizes

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ installed
- Backend API running on `http://127.0.0.1:8000`

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:5173/ in your browser.

### Build

```bash
npm run build
```

## 📁 Project Structure

```
src/
  ├── components/           # Reusable React components
  │   ├── AnimatedPipeline.jsx   # Step-by-step pipeline animation
  │   ├── Arrow.jsx              # Animated arrow between stages
  │   ├── EnhancedStage.jsx      # Stage with tree/JSON toggle
  │   ├── PrettyJSON.jsx         # Formatted JSON display
  │   ├── QuestionSelector.jsx   # Question input interface
  │   ├── ResultPanel.jsx        # Result display cards
  │   ├── Stage.jsx              # Basic stage component
  │   └── TreeVisualizer.jsx     # Tree view for nested data
  ├── utils/                # Business logic
  │   ├── api.js                 # Backend API calls
  │   └── pipelineHelpers.js     # Pipeline data transformation
  ├── styles/               # Styling
  │   └── theme.js               # Centralized theme configuration
  ├── App.jsx               # Main application component
  ├── main.jsx             # Application entry point
  └── index.css            # Global styles & animations
```

## 🎮 How to Use

1. **Select a question**:

   - Choose from demo questions dropdown, OR
   - Enter a custom question in the input field

2. **Run the query**:

   - Click "Run Query" button, OR
   - Press Enter in the custom question field

3. **Watch the animation**:

   - Pipeline steps appear one by one
   - Adjust animation speed with the slider
   - Click "Replay" to see it again
   - Click "Show All" to skip animation

4. **Explore the data**:

   - Toggle between 🌳 Tree and {} JSON views
   - Click on nodes to expand/collapse
   - Hover over components for interactions

5. **View results**:
   - Results appear in two demo cards
   - Active result is highlighted
   - Raw backend steps available below

## 🎨 Theme Customization

Edit `src/styles/theme.js` to customize colors, gradients, shadows, and animations.

## 🔧 API Configuration

Update `API_URL` in `src/utils/api.js` to point to your backend:

```javascript
export const API_URL = "http://your-backend-url:port";
```

## 📝 Backend API Requirements

The backend should provide these endpoints:

### GET `/questions`

Returns array of demo questions:

```json
[
  { "id": 1, "text": "ai sở hữu excalibur ?" },
  ...
]
```

### POST `/run`

Processes a question and returns results:

```json
{
  "answer": "arthur",
  "steps": [
    { "step": "tokens", "data": [...] },
    { "step": "parse", "data": {...} },
    { "step": "dịch", "data": {...} },
    { "step": "wh_query", "data": "..." },
    { "step": "wh_result", "data": [...] }
  ]
}
```

## 🌟 Key Technologies

- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **Inter font** - Modern typography
- **CSS3 animations** - Smooth transitions
- **Glassmorphism** - Modern UI design trend

## 💡 Tips

- For complex nested data, use **Tree view** for better readability
- Slow down animations to better understand the pipeline flow
- Use browser DevTools to inspect the data structures
- Check the "Raw backend steps" section for debugging

## 🐛 Troubleshooting

**App won't start:**

- Make sure you ran `npm install`
- Check that no other app is using port 5173

**"No questions available":**

- Backend `/questions` endpoint might be unavailable
- You can still use custom question input

**Results not showing:**

- Check that backend is running on the correct URL
- Open browser console to see error messages
- Verify the backend returns the expected JSON format

---

Made with ❤️ using modern web technologies
