/**
 * Section Loader
 * Dynamically loads extracted sections into the main page
 */

document.addEventListener('DOMContentLoaded', function() {
  // Determine if we're on the Arabic or English page
  const isArabic = document.documentElement.lang === 'ar' || 
                   document.documentElement.dir === 'rtl' ||
                   window.location.pathname.includes('/ar/');
  
  // Load ESG section based on language
  if (isArabic) {
    loadSection('esg', 'sections/esg-section.html');
  } else {
    loadSection('esg', './sections/esg-section.html');
  }
});

/**
 * Load a section from an external HTML file
 * @param {string} sectionId - The ID of the placeholder element
 * @param {string} sectionFile - Path to the section HTML file
 */
function loadSection(sectionId, sectionFile) {
  const placeholder = document.getElementById(sectionId + '-placeholder');
  if (!placeholder) {
    console.warn(`Placeholder element #${sectionId}-placeholder not found`);
    return;
  }

  fetch(sectionFile)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load ${sectionFile}: ${response.statusText}`);
      }
      return response.text();
    })
    .then(html => {
      placeholder.innerHTML = html;
      // Re-initialize AOS animations for the loaded content
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
      // Re-initialize any other scripts that need to run on the loaded content
      initializeSectionScripts(placeholder);
    })
    .catch(error => {
      console.error('Error loading section:', error);
      placeholder.innerHTML = `<p style="color: red; padding: 20px;">Error loading section: ${error.message}</p>`;
    });
}

/**
 * Initialize scripts for dynamically loaded sections
 */
function initializeSectionScripts(container) {
  // Re-initialize accordion functionality if needed
  const accordionHeaders = container.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      this.classList.toggle('opened');
    });
  });

  // Re-initialize card elements if needed
  const cardElements = container.querySelectorAll('.cards__element');
  cardElements.forEach(card => {
    const title = card.querySelector('.cards__element-title');
    if (title) {
      title.addEventListener('click', function() {
        card.classList.toggle('is-open');
      });
    }
  });
}

