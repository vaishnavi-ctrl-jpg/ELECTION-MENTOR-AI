import re, os

base = r"c:\Users\Vaishnavi\Desktop\spare 1"
html_files = [f for f in os.listdir(base) if f.endswith('.html') and f != 'test.html']

for fname in html_files:
    path = os.path.join(base, fname)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove ALL inline <script>...</script> blocks (Firebase init, GA init, Google Translate init)
    content = re.sub(r'\s*<script>\s*(?:const firebaseConfig|window\.dataLayer|function googleTranslateElementInit)[\s\S]*?</script>', '', content)

    # 2. Remove inline <script> blocks with var/let/const patterns
    content = re.sub(r'\s*<script type="text/javascript">\s*function googleTranslateElementInit[\s\S]*?</script>', '', content)

    # 3. Fix protocol-relative URLs to use https
    content = content.replace('src="//translate.google.com', 'src="https://translate.google.com')

    # 4. Add CSP meta tag after charset if not present
    if 'Content-Security-Policy' not in content:
        csp = '    <meta http-equiv="Content-Security-Policy" content="default-src \'self\'; script-src \'self\' https://www.googletagmanager.com https://www.gstatic.com https://translate.google.com https://translate.googleapis.com https://cdnjs.cloudflare.com \'unsafe-inline\'; style-src \'self\' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://translate.googleapis.com \'unsafe-inline\'; font-src \'self\' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src \'self\' https: data:; frame-src https://www.google.com https://translate.google.com; connect-src \'self\' https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://www.googleapis.com https://www.google-analytics.com https://translate.googleapis.com;">\n'
        content = content.replace('<meta charset="UTF-8">', '<meta charset="UTF-8">\n' + csp)

    # 5. Add external script references before </head> if not present (for index.html only)
    if fname == 'index.html':
        if 'firebase-init.js' not in content:
            insert = '    <script src="firebase-init.js" defer></script>\n    <script src="analytics.js" defer></script>\n'
            content = content.replace('</head>', insert + '</head>')
    else:
        if 'analytics.js' not in content:
            insert = '    <script src="analytics.js" defer></script>\n'
            content = content.replace('</head>', insert + '</head>')

    # 6. Remove excessive inline styles from structural divs (keep only essential ones)
    # Convert common inline style patterns to classes
    content = content.replace(' style="cursor: pointer;"', '')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Security fixes applied to all HTML files!")
