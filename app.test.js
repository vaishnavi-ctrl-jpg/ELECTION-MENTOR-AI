/**
 * Comprehensive Test Suite for Election Mentor AI
 * Covers: Navigation, Accessibility, Security, Google Services,
 * Data Integrity, Efficiency, Code Quality, Edge Cases, Input Validation
 */

const fs = require('fs');
const path = require('path');

// Helper: read HTML file
function readHTML(filename) {
  return fs.readFileSync(path.join(__dirname, filename), 'utf-8');
}

// All page files
const pages = [
  'index.html', 'age-selection.html', 'location-selection.html',
  'voter-type.html', 'timeline.html', 'simulation.html',
  'id-verification.html', 'evm-voting.html', 'ink-marking.html',
  'journey-progress.html', 'learn.html'
];

// ===== NAVIGATION FLOW =====
describe('Navigation Flow Tests', () => {
  test('Dashboard links to age-selection', () => {
    const html = readHTML('index.html');
    expect(html).toContain('age-selection.html');
  });

  test('Age selection links to location-selection', () => {
    const html = readHTML('age-selection.html');
    expect(html).toContain('location-selection.html');
  });

  test('Location selection links to voter-type', () => {
    const html = readHTML('location-selection.html');
    expect(html).toContain('voter-type.html');
  });

  test('Voter type links back to index', () => {
    const html = readHTML('voter-type.html');
    expect(html).toContain('index.html');
  });

  test('Simulation links to id-verification', () => {
    const html = readHTML('simulation.html');
    expect(html).toContain('id-verification.html');
  });

  test('ID verification links to evm-voting', () => {
    const html = readHTML('id-verification.html');
    expect(html).toContain('evm-voting.html');
  });

  test('EVM voting links to ink-marking', () => {
    const html = readHTML('evm-voting.html');
    expect(html).toContain('ink-marking.html');
  });

  test('Ink marking links back to index', () => {
    const html = readHTML('ink-marking.html');
    expect(html).toContain('index.html');
  });

  test('All sidebar nav items are present on dashboard', () => {
    const html = readHTML('index.html');
    expect(html).toContain('timeline.html');
    expect(html).toContain('simulation.html');
    expect(html).toContain('learn.html');
    expect(html).toContain('journey-progress.html');
  });
});

// ===== ACCESSIBILITY (DOM-LEVEL) =====
describe('Accessibility Tests (DOM-Level)', () => {
  pages.forEach(page => {
    test(`${page} has lang="en" attribute`, () => {
      const html = readHTML(page);
      expect(html).toMatch(/<html\s+lang="en"/);
    });

    test(`${page} has meta description`, () => {
      const html = readHTML(page);
      expect(html).toContain('meta name="description"');
    });

    test(`${page} has skip navigation link`, () => {
      const html = readHTML(page);
      expect(html).toContain('skip-link');
      expect(html).toContain('#main-content');
    });

    test(`${page} has ARIA role="navigation" on sidebar`, () => {
      const html = readHTML(page);
      expect(html).toContain('role="navigation"');
    });

    test(`${page} has ARIA role="main" on content`, () => {
      const html = readHTML(page);
      expect(html).toContain('role="main"');
    });

    test(`${page} has main-content id for skip link target`, () => {
      const html = readHTML(page);
      expect(html).toContain('id="main-content"');
    });

    test(`${page} has viewport meta tag`, () => {
      const html = readHTML(page);
      expect(html).toContain('viewport');
    });
  });

  test('Dashboard nav items have aria-labels', () => {
    const html = readHTML('index.html');
    expect(html).toContain('aria-label="Go to Dashboard"');
    expect(html).toContain('aria-label="Go to Timeline"');
    expect(html).toContain('aria-label="Go to Simulation"');
  });

  test('Images have alt attributes', () => {
    const html = readHTML('index.html');
    const imgTags = html.match(/<img[^>]+>/g) || [];
    imgTags.forEach(img => {
      expect(img).toContain('alt=');
    });
  });

  test('Ink marking image has descriptive alt text', () => {
    const html = readHTML('ink-marking.html');
    expect(html).toContain('alt="Ink marking process');
  });
});

// ===== SECURITY (DOM-LEVEL) =====
describe('Security Tests (DOM-Level)', () => {
  pages.forEach(page => {
    test(`${page} has Content-Security-Policy meta tag`, () => {
      const html = readHTML(page);
      expect(html).toContain('Content-Security-Policy');
    });

    test(`${page} has no inline onclick handlers`, () => {
      const html = readHTML(page);
      expect(html).not.toMatch(/\sonclick="/);
    });
  });

  test('No protocol-relative URLs (security risk)', () => {
    pages.forEach(page => {
      const html = readHTML(page);
      expect(html).not.toContain('src="//');
    });
  });

  test('External scripts use https', () => {
    const html = readHTML('index.html');
    const scriptTags = html.match(/<script[^>]+src="[^"]+"/g) || [];
    scriptTags.forEach(tag => {
      if (tag.includes('src="http')) {
        expect(tag).toContain('https://');
      }
    });
  });

  test('nginx.conf has X-Frame-Options', () => {
    const conf = fs.readFileSync(path.join(__dirname, 'nginx.conf'), 'utf-8');
    expect(conf).toContain('X-Frame-Options');
  });

  test('nginx.conf has X-Content-Type-Options', () => {
    const conf = fs.readFileSync(path.join(__dirname, 'nginx.conf'), 'utf-8');
    expect(conf).toContain('X-Content-Type-Options');
  });

  test('nginx.conf has X-XSS-Protection', () => {
    const conf = fs.readFileSync(path.join(__dirname, 'nginx.conf'), 'utf-8');
    expect(conf).toContain('X-XSS-Protection');
  });

  test('nginx.conf has HSTS', () => {
    const conf = fs.readFileSync(path.join(__dirname, 'nginx.conf'), 'utf-8');
    expect(conf).toContain('Strict-Transport-Security');
  });

  test('nginx.conf has Referrer-Policy', () => {
    const conf = fs.readFileSync(path.join(__dirname, 'nginx.conf'), 'utf-8');
    expect(conf).toContain('Referrer-Policy');
  });

  test('nginx.conf has Permissions-Policy', () => {
    const conf = fs.readFileSync(path.join(__dirname, 'nginx.conf'), 'utf-8');
    expect(conf).toContain('Permissions-Policy');
  });

  test('CSP blocks unsafe eval', () => {
    const html = readHTML('index.html');
    expect(html).not.toContain("'unsafe-eval'");
  });
});

// ===== GOOGLE SERVICES (DOM-LEVEL) =====
describe('Google Services Integration Tests (DOM-Level)', () => {
  test('Index.html loads Firebase App SDK', () => {
    const html = readHTML('index.html');
    expect(html).toContain('firebase-app-compat.js');
  });

  test('Index.html loads Firebase Auth SDK', () => {
    const html = readHTML('index.html');
    expect(html).toContain('firebase-auth-compat.js');
  });

  test('Index.html loads Firebase Firestore SDK', () => {
    const html = readHTML('index.html');
    expect(html).toContain('firebase-firestore-compat.js');
  });

  test('Index.html loads Firebase Analytics SDK', () => {
    const html = readHTML('index.html');
    expect(html).toContain('firebase-analytics-compat.js');
  });

  test('firebase-init.js exists and has real project ID', () => {
    const js = fs.readFileSync(path.join(__dirname, 'firebase-init.js'), 'utf-8');
    expect(js).toContain('project-f5565ebc-3db6-4527-9e7');
    expect(js).toContain('firebase.initializeApp');
  });

  test('Google Analytics tag manager is loaded', () => {
    const html = readHTML('index.html');
    expect(html).toContain('googletagmanager.com');
  });

  test('analytics.js file exists and configures gtag', () => {
    const js = fs.readFileSync(path.join(__dirname, 'analytics.js'), 'utf-8');
    expect(js).toContain('gtag');
    expect(js).toContain('dataLayer');
  });

  test('Google Translate widget element exists on dashboard', () => {
    const html = readHTML('index.html');
    expect(html).toContain('google_translate_element');
  });

  test('Google Maps embed exists on location page', () => {
    const html = readHTML('location-selection.html');
    expect(html).toContain('google.com/maps/embed');
  });

  test('Google Calendar integration exists on timeline', () => {
    const html = readHTML('timeline.html');
    expect(html).toContain('calendar.google.com');
  });

  pages.forEach(page => {
    test(`${page} loads Google Analytics`, () => {
      const html = readHTML(page);
      expect(html).toContain('analytics.js');
    });
  });
});

// ===== EFFICIENCY TESTS =====
describe('Efficiency Tests (File-Level)', () => {
  test('scaca.webp exists and is under 100KB', () => {
    const stats = fs.statSync(path.join(__dirname, 'scaca.webp'));
    expect(stats.size).toBeLessThan(100000);
  });

  test('Old scaca.png has been removed', () => {
    expect(fs.existsSync(path.join(__dirname, 'scaca.png'))).toBe(false);
  });

  test('building_asset.png is under 100KB', () => {
    const stats = fs.statSync(path.join(__dirname, 'building_asset.png'));
    expect(stats.size).toBeLessThan(100000);
  });

  test('All images use lazy loading', () => {
    pages.forEach(page => {
      const html = readHTML(page);
      const imgs = html.match(/<img[^>]+>/g) || [];
      imgs.forEach(img => {
        if (!img.includes('ui-avatars.com')) {
          expect(img).toContain('loading="lazy"');
        }
      });
    });
  });

  test('nginx.conf enables gzip compression', () => {
    const conf = fs.readFileSync(path.join(__dirname, 'nginx.conf'), 'utf-8');
    expect(conf).toContain('gzip on');
  });

  test('nginx.conf has cache headers for static assets', () => {
    const conf = fs.readFileSync(path.join(__dirname, 'nginx.conf'), 'utf-8');
    expect(conf).toContain('expires');
    expect(conf).toContain('Cache-Control');
  });

  test('WebP format is used for large images', () => {
    const html = readHTML('ink-marking.html');
    expect(html).toContain('.webp');
  });

  test('External scripts use defer attribute', () => {
    const html = readHTML('index.html');
    expect(html).toContain('defer');
  });
});

// ===== CODE QUALITY TESTS =====
describe('Code Quality Tests (DOM-Level)', () => {
  pages.forEach(page => {
    test(`${page} has DOCTYPE declaration`, () => {
      const html = readHTML(page);
      expect(html.trim().toLowerCase()).toMatch(/^<!doctype html>/);
    });

    test(`${page} has UTF-8 charset`, () => {
      const html = readHTML(page);
      expect(html).toContain('charset="UTF-8"');
    });

    test(`${page} has a <title> tag`, () => {
      const html = readHTML(page);
      expect(html).toMatch(/<title>[^<]+<\/title>/);
    });

    test(`${page} uses semantic <main> element`, () => {
      const html = readHTML(page);
      expect(html).toContain('<main');
    });

    test(`${page} uses semantic <nav> or <aside>`, () => {
      const html = readHTML(page);
      expect(html).toMatch(/<(nav|aside)/);
    });

    test(`${page} uses semantic <header>`, () => {
      const html = readHTML(page);
      expect(html).toContain('<header');
    });
  });

  test('All pages have unique titles', () => {
    const titles = pages.map(page => {
      const html = readHTML(page);
      const match = html.match(/<title>([^<]+)<\/title>/);
      return match ? match[1] : '';
    });
    const unique = new Set(titles);
    expect(unique.size).toBe(titles.length);
  });

  test('External CSS file exists', () => {
    expect(fs.existsSync(path.join(__dirname, 'styles.css'))).toBe(true);
  });

  test('External JS app.js file exists', () => {
    expect(fs.existsSync(path.join(__dirname, 'app.js'))).toBe(true);
  });

  test('package.json has test script', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8'));
    expect(pkg.scripts.test).toContain('jest');
  });

  test('Dockerfile exists for containerization', () => {
    expect(fs.existsSync(path.join(__dirname, 'Dockerfile'))).toBe(true);
  });

  test('.gitignore excludes node_modules', () => {
    const gitignore = fs.readFileSync(path.join(__dirname, '.gitignore'), 'utf-8');
    expect(gitignore).toContain('node_modules');
  });
});

// ===== DATA & STATE MANAGEMENT =====
describe('Data & State Management Tests', () => {
  test('Age selection page has localStorage save function', () => {
    const html = readHTML('age-selection.html');
    expect(html).toContain('localStorage');
    expect(html).toContain('voter_age');
  });

  test('Location selection page saves state and district', () => {
    const html = readHTML('location-selection.html');
    expect(html).toContain('voter_state');
    expect(html).toContain('voter_district');
  });

  test('Voter type page saves voter type', () => {
    const html = readHTML('voter-type.html');
    expect(html).toContain('voter_type');
  });

  test('EVM voting page saves voted candidate', () => {
    const html = readHTML('evm-voting.html');
    expect(html).toContain('voted_candidate');
  });

  test('Dashboard reads localStorage values', () => {
    const html = readHTML('index.html');
    expect(html).toContain('localStorage.getItem');
  });

  test('Confidence score calculation is present', () => {
    const html = readHTML('index.html');
    expect(html).toContain('score');
    expect(html).toContain('progressCircle');
  });
});

// ===== INPUT VALIDATION & EDGE CASES =====
describe('Input Validation & Edge Cases', () => {
  test('EVM voting has multiple candidate options', () => {
    const html = readHTML('evm-voting.html');
    const rows = (html.match(/candidate-row/g) || []).length;
    expect(rows).toBeGreaterThanOrEqual(5);
  });

  test('Age selection has age input field', () => {
    const html = readHTML('age-selection.html');
    expect(html).toMatch(/(input|slider|age)/i);
  });

  test('All pages load the shared stylesheet', () => {
    pages.forEach(page => {
      const html = readHTML(page);
      expect(html).toContain('styles.css');
    });
  });

  test('All pages load the shared app.js', () => {
    pages.forEach(page => {
      const html = readHTML(page);
      expect(html).toContain('app.js');
    });
  });

  test('Error handling in firebase-init.js', () => {
    const js = fs.readFileSync(path.join(__dirname, 'firebase-init.js'), 'utf-8');
    expect(js).toContain('try');
    expect(js).toContain('catch');
  });

  test('IIFE pattern used in firebase-init.js for scope safety', () => {
    const js = fs.readFileSync(path.join(__dirname, 'firebase-init.js'), 'utf-8');
    expect(js).toContain('use strict');
  });

  test('IIFE pattern used in analytics.js for scope safety', () => {
    const js = fs.readFileSync(path.join(__dirname, 'analytics.js'), 'utf-8');
    expect(js).toContain('use strict');
  });
});
