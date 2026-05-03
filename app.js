/* Election Mentor AI - Main Application Logic */
/* All event handlers are registered via addEventListener (no inline onclick) */

document.addEventListener('DOMContentLoaded', function() {

  // === GLOBAL: Help Widget Navigation ===
  document.querySelectorAll('.need-help-widget').forEach(function(widget) {
    widget.style.cursor = 'pointer';
    widget.setAttribute('role', 'button');
    widget.setAttribute('aria-label', 'Open AI Assistant');
    widget.setAttribute('tabindex', '0');
    widget.addEventListener('click', function() {
      if (typeof openAIChat === 'function') {
        openAIChat();
      } else {
        window.location.href = 'index.html?chat=true';
      }
    });
    widget.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        widget.click();
      }
    });
  });

  // === DASHBOARD: View Details button ===
  var viewDetailsBtn = document.querySelector('.confidence-card .btn-primary');
  if (viewDetailsBtn && !viewDetailsBtn.classList.contains('send-btn')) {
    viewDetailsBtn.addEventListener('click', function() {
      window.location.href = 'age-selection.html';
    });
  }

  // === DASHBOARD: Chat Send Button ===
  var sendBtn = document.querySelector('.send-btn');
  if (sendBtn && typeof sendMessage === 'function') {
    sendBtn.addEventListener('click', function() {
      sendMessage();
    });
  }

  // === DASHBOARD: Chat Reset Icon ===
  var resetIcon = document.querySelector('.reset-icon');
  if (resetIcon && typeof resetChat === 'function') {
    resetIcon.addEventListener('click', function() {
      resetChat();
    });
  }

  // === AGE SELECTION: Next Button ===
  var ageNextBtn = document.querySelector('.onboarding-next-btn:not(.location-next-btn):not(.voter-finish-btn)');
  if (ageNextBtn && typeof saveAgeAndNavigate === 'function') {
    ageNextBtn.addEventListener('click', function() {
      saveAgeAndNavigate();
    });
  }

  // === LOCATION SELECTION: Next Button ===
  var locationNextBtn = document.querySelector('.location-next-btn');
  if (locationNextBtn && typeof saveLocationAndNavigate === 'function') {
    locationNextBtn.addEventListener('click', function() {
      saveLocationAndNavigate();
    });
  }

  // === VOTER TYPE: Choice Boxes ===
  document.querySelectorAll('.choice-box').forEach(function(box) {
    box.setAttribute('role', 'radio');
    box.setAttribute('tabindex', '0');
    box.addEventListener('click', function() {
      if (typeof selectChoice === 'function') {
        selectChoice(this);
      }
    });
    box.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        box.click();
      }
    });
  });

  // === VOTER TYPE: Finish Button ===
  var voterFinishBtn = document.querySelector('.voter-finish-btn');
  if (voterFinishBtn && typeof saveVoterTypeAndNavigate === 'function') {
    voterFinishBtn.addEventListener('click', function() {
      saveVoterTypeAndNavigate();
    });
  }

  // === SIMULATION: Next Step Button ===
  var simNextBtn = document.querySelector('.next-step-btn');
  if (simNextBtn) {
    var page = window.location.pathname.split('/').pop();
    simNextBtn.addEventListener('click', function() {
      if (page === 'simulation.html') {
        window.location.href = 'id-verification.html';
      } else if (page === 'id-verification.html') {
        window.location.href = 'evm-voting.html';
      }
    });
  }

  // === EVM VOTING: Candidate Rows ===
  document.querySelectorAll('.candidate-row').forEach(function(row, index) {
    row.setAttribute('role', 'radio');
    row.setAttribute('tabindex', '0');
    row.setAttribute('aria-label', 'Select candidate ' + (index + 1));
    row.addEventListener('click', function() {
      if (typeof selectCandidate === 'function') {
        selectCandidate(this, index + 1);
      }
    });
    row.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        row.click();
      }
    });
  });

  // === EVM VOTING: EVM Buttons ===
  document.querySelectorAll('.evm-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      if (typeof castVote === 'function') {
        castVote();
      }
    });
  });

  // === INK MARKING: Finish Button ===
  var finishBtn = document.querySelector('.finish-btn');
  if (finishBtn) {
    finishBtn.addEventListener('click', function() {
      window.location.href = 'index.html';
    });
  }

  // === JOURNEY PROGRESS: Track Status Button ===
  var trackBtn = document.querySelector('.track-btn');
  if (trackBtn) {
    trackBtn.addEventListener('click', function() {
      if (typeof trackStatus === 'function') {
        trackStatus(this);
      }
    });
  }

  // === TIMELINE: Add Now (Calendar) Button ===
  var calendarBtn = document.querySelector('.cta-btn');
  if (calendarBtn && window.location.pathname.includes('timeline')) {
    calendarBtn.addEventListener('click', function() {
      window.open('https://calendar.google.com/calendar/render?action=TEMPLATE&text=Voting+Day&dates=20241120T070000Z/20241120T180000Z&details=Election+Mentor+AI+-+Voting+Day', '_blank');
    });
  }

  // === Log page view to Firebase Analytics (if available) ===
  if (typeof firebase !== 'undefined' && firebase.analytics) {
    try {
      firebase.analytics().logEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href
      });
    } catch(e) { /* analytics not initialized */ }
  }

});
