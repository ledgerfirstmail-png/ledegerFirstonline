# Ledger First Website Add-Ons
## EXACTLY Match Your Current Site Design

These files use your EXACT colors, fonts, and Three.js background:
- **Background:** `#0a0a0f`
- **Gold accent:** `#d4af37`
- **Teal accent:** `#00d4aa`
- **Text:** `#f0f0f5`
- **Muted:** `#8899aa`
- **Fonts:** Outfit + Space Grotesk
- **Three.js** starfield background included on every page

---

## 📄 New Pages (Upload to Your Server)

| File | Purpose | Link From Your Nav |
|------|---------|-------------------|
| `pricing.html` | Full pricing page with 4 tiers + app prices | Add "Pricing" to nav |
| `switch-from-quickbooks.html` | QuickBooks comparison with savings calc | Link from homepage |
| `thank-you.html` | Form submission confirmation | Set as form action |

---

## 🔧 How to Deploy

### Step 1: Upload the 3 new files
Put `pricing.html`, `switch-from-quickbooks.html`, and `thank-you.html` in the **same folder** as your existing `index.html`.

### Step 2: Add "Pricing" to your navigation
In your existing `index.html`, find this section:
```html
<div class="links">
  <a href="#home">Home</a>
  <a href="#apps">Apps</a>
  <a href="#products">Products</a>
  <a href="#about">About</a>
  <a href="#contact">Contact</a>
</div>
```

Add one line:
```html
<div class="links">
  <a href="#home">Home</a>
  <a href="#apps">Apps</a>
  <a href="pricing.html">Pricing</a>  <!-- ADD THIS -->
  <a href="#products">Products</a>
  <a href="#about">About</a>
  <a href="#contact">Contact</a>
</div>
```

### Step 3: Link your contact form to thank-you page
In your contact form, change:
```html
action="https://formsubmit.co/ledgerfirstmail@gmail.com"
```

To:
```html
action="https://formsubmit.co/ledgerfirstmail@gmail.com"
```

And add a hidden field:
```html
<input type="hidden" name="_next" value="https://www.ledger-first.com/thank-you.html">
```

### Step 4: Update your footer links
In your existing footer, add:
```html
<a href="pricing.html">Pricing</a>
<a href="switch-from-quickbooks.html">Switch from QuickBooks</a>
```

---

## ✅ What Each Page Does

### pricing.html
- Shows 4 subscription tiers: Free / Pro ($9.99) / Team ($49.99) / Enterprise
- Lists all 10 individual app prices
- QuickBooks comparison table
- Links to "Contact" for Enterprise

### switch-from-quickbooks.html
- Headline: "Ditch QuickBooks. Keep Your Money."
- Side-by-side feature comparison
- 5-year savings calculation: $2,400 - $4,800
- Free migration steps
- Testimonial

### thank-you.html
- Confirmation page after form submission
- Auto-redirects to homepage after 10 seconds
- Links back to home or pricing

---

## 🎨 Design Match

Every page uses:
- ✅ Same Three.js gold starfield background
- ✅ Same `Space Grotesk` + `Outfit` fonts
- ✅ Same gold gradient text headings
- ✅ Same dark card backgrounds with gold borders
- ✅ Same button styles (rounded, gradient, hover effects)
- ✅ Same navbar design
- ✅ Same footer design
- ✅ Fully responsive (mobile optimized)

---

## 📱 Preview Locally

```bash
cd /path/to/your/website
python -m http.server 8080
```

Then open:
- http://localhost:8080/pricing.html
- http://localhost:8080/switch-from-quickbooks.html
- http://localhost:8080/thank-you.html

---

## 🚀 Next Steps After Upload

1. **Test all links** between pages work
2. **Submit your contact form** to verify thank-you page
3. **Add Google Analytics** if you want tracking
4. **Share the QuickBooks page** with prospects
5. **Link to Pricing** from your social media

---

*Files ready to upload. No changes needed to your existing site except adding 1 nav link.*
