# Quick Start Guide - Unity-Room Mockup

## 🚀 Running the Application

```bash
cd mockup
npm install
npm run dev
```

Then open **http://localhost:5173** in your browser.

## 🎮 Controls & Features

### Mouse Controls
- **Click & Drag**: Rotate the 3D scene
- **Scroll**: Zoom in/out
- **Click Platform Node**: View detailed metrics and content

### Keyboard Shortcuts
- **1**: Network Graph mode (default)
- **2**: Control Room mode (coming soon)
- **3**: Command Dashboard mode (coming soon)

### UI Elements

#### Top Bar
- **Juhainah Logo**: Main branding
- **Mode Indicator**: Current visualization mode
- **Play Scenario**: Enter scenario mode to watch the $500M tech fund timeline

#### Left Side
- **System Stats Cards**:
  - Platforms Active (8/8)
  - Monthly Cost ($15,705)
  - Daily Volume (~15K items)
  - Average Accuracy (95%+)
  
- **Layer Breakdown**:
  - Truth Layer (3 platforms)
  - Speed Layer (3 platforms)
  - Depth Layer (2 platforms)

#### Right Side
- **Platform Status**: Real-time health of all 8 platforms
  - Green dot = Active
  - Gray dot = Inactive
  - Shows processing volume per minute

#### Alert Feed (Right Panel)
- Click the **Alert** button to open
- Shows real-time intelligence insights
- Cross-platform correlations
- Sentiment gaps
- In scenario mode: Shows scenario insights

#### Platform Details (Left Panel)
- Opens when you click any platform node
- Shows:
  - Platform name (English + Arabic)
  - Layer and tier information
  - Cost per month
  - Live metrics (volume, accuracy, sentiment, latency)
  - Recent content items with Arabic/English headlines

## 🎬 Scenario Mode

Click **"Play Scenario"** to watch the $500M Technology Fund announcement unfold:

1. **9:00 AM** - Government announces on KUNA
2. **9:30 AM** - Stock market reacts (+2.1% tech sector)
3. **11:00 AM** - TV coverage begins (92% positive)
4. **11:30 AM** - Digital news raises questions
5. **3:00 PM** - Twitter sentiment gap detected (60% vs 92%)
6. **6:00 PM** - Radio reveals information gap
7. **Next Day** - Print analysis and podcast predictions

### Insights Generated:
- ✅ Market validation
- ⚠️ Sentiment gap (Trust issue)
- ⚠️ Information gap (Public doesn't know how to apply)
- 🔗 Cross-platform correlations
- 📊 Quantified impact ($85M market cap added)

## 🎨 Visual Elements Explained

### Platform Nodes
- **Crystal-like shapes**: Represent each intelligence platform
- **Pulsing animation**: Activity level
- **Floating particles**: High-volume processing
- **Color-coded**:
  - 🟢 Green = Truth Layer (Government, Stock, Print)
  - 🔵 Blue = Speed Layer (TV, Twitter, Radio)
  - 🟣 Purple = Depth Layer (Digital News, Podcasts)

### Central Juhainah Core
- **Golden sphere**: The AI brain processing all data
- **Rotating rings**: Energy flow
- **Pulses faster**: More platforms active

### Data Particles
- **300+ particles** flowing between platforms
- **Colors indicate data type**:
  - 🟡 Yellow = News
  - 🔵 Blue = Social media
  - 🟢 Green = Official/Government
  - 🟠 Orange = Financial

### Connection Lines
- **Curved lines**: Relationships between platforms
- **Glow intensity**: Data volume
- **Pulse animation**: Active connections

### Layer Rings
- **Three horizontal rings**: Showing the three-layer architecture
- **Slowly rotating**: Dynamic visualization

## 📊 The 8 Platforms

### Truth Layer (Primary Sources)
1. **🏛️ Government** - $150/mo - KUNA + 10 ministries
2. **📈 Stock Exchange** - Free - 200+ companies
3. **📄 Print Media** - $650/mo - Official Gazette + newspapers

### Speed Layer (Real-Time)
4. **📺 TV Broadcasting** - $2,200/mo - 6 channels 24/7
5. **📱 Twitter/X** - $10,600/mo - 50K+ tweets/day
6. **📻 Radio** - $450/mo - 5 stations

### Depth Layer (Analysis)
7. **📰 Digital News** - $1,055/mo - 8 outlets
8. **🎙️ Podcasts** - $600/mo - 10+ shows

**Total: $15,705/month (~$188K/year)**

## 🇰🇼 Realistic Kuwait Data

All data is based on actual Kuwait entities:

- **TV**: Al Jazeera, Al Arabiya, Kuwait TV, BBC Arabic, Sky News, France 24
- **Companies**: NBK, KFH, Zain, Ooredoo, Agility, Humansoft, KAMCO, etc.
- **News**: Al Qabas, Al Rai, Kuwait Times, Arab Times, Al Jarida
- **Radio**: Marina FM, Kuwait FM, Radio Kuwait, Super Station
- **Government**: KUNA, Ministry of Finance, Central Bank, Parliament, etc.

## 🛠️ Technical Stack

- **React 18** + **TypeScript**
- **Three.js** + **React Three Fiber** (3D rendering)
- **Zustand** (state management)
- **Tailwind CSS** (styling)
- **Framer Motion** (UI animations)
- **Vite** (build tool)

## 🎯 What's Next?

### Planned Enhancements
- [ ] Control Room mode (VR-like room with floating monitors)
- [ ] Command Dashboard mode (2D/3D hybrid)
- [ ] More scenarios (crisis, elections, economic announcements)
- [ ] Timeline scrubbing
- [ ] VR support
- [ ] Live API integration
- [ ] Export reports

## 📝 Notes

- The mockup runs entirely in the browser
- All data is simulated (updates every 2 seconds)
- Optimized for desktop browsers (Chrome, Firefox, Safari, Edge)
- Tablet support included
- No backend required

## 🐛 Troubleshooting

**If the 3D scene doesn't load:**
- Ensure your browser supports WebGL 2
- Try disabling browser extensions
- Clear cache and reload

**If it's slow:**
- Close other tabs
- Reduce particle count (edit `DataParticles.tsx`)
- Disable bloom effect (edit `App.tsx`)

## 📞 Questions?

This is a creative mockup demonstrating the vision for Juhainah's intelligence platform visualization. The focus is on artistic, non-traditional UX that makes data exploration engaging and intuitive.

**Repository**: https://github.com/AthbiHC/unity-room

---

**Built with ❤️ for Project Juhainah** - "عند جهينة الخبر اليقين"

