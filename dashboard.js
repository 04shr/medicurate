// dashboard.js

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    initializeTooltips();

    // Initialize charts
    initializeAdherenceChart();

    // Add event listeners
    addEventListeners();

    // Simulate notifications
    simulateNotifications();
});

// Initialize tooltips
function initializeTooltips() {
    // This would typically use a library like Tippy.js or Bootstrap Tooltips
    // For this example, we'll just log that tooltips were initialized
    console.log('Tooltips initialized');
}

// Adherence chart initialization
function initializeAdherenceChart() {
    // In a real implementation, this would use a library like Chart.js
    // We're using SVG directly in the HTML, so this is just a placeholder
    console.log('Adherence chart initialized');
    
    // Add hover effects to chart bars
    const chartBars = document.querySelectorAll('.chart rect');
    
    chartBars.forEach(bar => {
        bar.addEventListener('mouseover', function() {
            this.style.opacity = '1';
        });
        
        bar.addEventListener('mouseout', function() {
            this.style.opacity = '0.8';
        });
    });
}

// Add event listeners
function addEventListeners() {
    // Navigation menu items
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Prevent default anchor behavior
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get the href attribute to determine which section to show
            const target = this.querySelector('a').getAttribute('href').substring(1);
            
            // For this demo, we'll just log the navigation
            console.log(`Navigating to: ${target}`);
            
            // In a real application, you would show/hide sections or navigate to new pages
        });
    });
    
    // Period buttons for chart
    const periodBtns = document.querySelectorAll('.period-btn');
    
    periodBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all period buttons
            periodBtns.forEach(periodBtn => {
                periodBtn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the period
            const period = this.textContent.trim().toLowerCase();
            
            // For this demo, we'll just log the period change
            console.log(`Changing chart period to: ${period}`);
            
            // In a real application, you would update the chart data
            simulateChartUpdate(period);
        });
    });
    
    // Dispense now buttons
    const dispenseButtons = document.querySelectorAll('.btn-outline.btn-sm');
    
    dispenseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const slotHeader = this.closest('.dispenser-slot').querySelector('.slot-header h3').textContent;
            const medication = this.closest('.dispenser-slot').querySelector('.slot-info p:first-child').textContent;
            
            if (medication.includes('Not configured')) {
                alert('This slot is not configured with any medication.');
                return;
            }
            
            const confirmDispense = confirm(`Are you sure you want to dispense medication from ${slotHeader}?`);
            
            if (confirmDispense) {
                // Simulate dispensing
                simulateDispensing(slotHeader);
            }
        });
    });
    
    // Configure and edit buttons
    const configButtons = document.querySelectorAll('.btn-primary.btn-sm');
    
    configButtons.forEach(button => {
        button.addEventListener('click', function() {
            const slotHeader = this.closest('.dispenser-slot').querySelector('.slot-header h3').textContent;
            
            // For this demo, we'll just log the configuration action
            console.log(`Opening configuration for ${slotHeader}`);
            
            // In a real application, you would open a modal or navigate to a configuration page
            alert(`Configuration panel for ${slotHeader} would open here.`);
        });
    });
    
    // Refresh button
    const refreshButton = document.querySelector('.section-header .btn-primary');
    
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            // Simulate refreshing dispenser status
            simulateRefreshing();
        });
    }
    
    // Search bar
    const searchInput = document.querySelector('.search-bar input');
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                
                if (searchTerm) {
                    // For this demo, we'll just log the search
                    console.log(`Searching for: ${searchTerm}`);
                    
                    // Clear the search input
                    this.value = '';
                    
                    // Simulate search results
                    alert(`Search results for "${searchTerm}" would be displayed here.`);
                }
            }
        });
    }
    
    // Notifications
    const notificationsIcon = document.querySelector('.notifications');
    
    if (notificationsIcon) {
        notificationsIcon.addEventListener('click', function() {
            // For this demo, we'll just log the notification click
            console.log('Opening notifications');
            
            // In a real application, you would open a notifications panel
            alert('Notifications panel would open here.');
            
            // Clear the notification badge
            const badge = this.querySelector('.notification-badge');
            badge.textContent = '0';
            badge.style.display = 'none';
        });
    }
}

// Simulate chart update
function simulateChartUpdate(period) {
    // Simulate loading state
    document.querySelector('.chart').style.opacity = '0.5';
    
    // Simulate delay for API call
    setTimeout(() => {
        // Restore opacity
        document.querySelector('.chart').style.opacity = '1';
        
        // Update legend to show that data has changed
        const legendLabel = document.querySelector('.legend-label:last-child');
        
        if (period === 'week') {
            legendLabel.textContent = 'Weekly Average: 92%';
        } else if (period === 'month') {
            legendLabel.textContent = 'Monthly Average: 88%';
        } else if (period === 'year') {
            legendLabel.textContent = 'Yearly Average: 85%';
        }
        
        // In a real application, you would update the chart data points
    }, 500);
}

// Simulate dispensing
function simulateDispensing(slotName) {
    // Show loading state
    const allSlots = document.querySelectorAll('.dispenser-slot');
    
    allSlots.forEach(slot => {
        if (slot.querySelector('.slot-header h3').textContent === slotName) {
            slot.style.opacity = '0.7';
            
            // Simulate dispensing delay
            setTimeout(() => {
                slot.style.opacity = '1';
                
                // Add a new activity
                addActivity('Medication Dispensed', 
                           `Manual dispense from ${slotName}`, 
                           'green', 
                           'check');
                
                alert(`Medication from ${slotName} has been dispensed.`);
            }, 1500);
        }
    });
}

// Simulate refreshing
function simulateRefreshing() {
    // Show loading state for all slots
    const allSlots = document.querySelectorAll('.dispenser-slot');
    const refreshButton = document.querySelector('.section-header .btn-primary');
    
    // Disable button and add spinner
    refreshButton.disabled = true;
    const originalButtonText = refreshButton.innerHTML;
    refreshButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
    
    // Fade all slots
    allSlots.forEach(slot => {
        slot.style.opacity = '0.7';
    });
    
    // Simulate refresh delay
    setTimeout(() => {
        // Restore opacity
        allSlots.forEach(slot => {
            slot.style.opacity = '1';
        });
        
        // Update a random slot with new information (for demo purposes)
        const randomIndex = Math.floor(Math.random() * allSlots.length);
        const randomSlot = allSlots[randomIndex];
        
        // Only update if it's an active slot
        if (randomSlot.querySelector('.status').textContent === 'Active') {
            const remainingText = randomSlot.querySelector('.slot-info p:last-child');
            
            // Extract current number
            const currentText = remainingText.textContent;
            const matches = currentText.match(/(\d+)/g);
            
            if (matches && matches.length > 0) {
                const currentValue = parseInt(matches[0]);
                const newValue = currentValue - 1;
                
                // Update with new value
                remainingText.innerHTML = remainingText.innerHTML.replace(`${currentValue}`, `${newValue}`);
                
                // Add a refreshed activity
                addActivity('Status Updated', 
                          `${randomSlot.querySelector('.slot-header h3').textContent} information refreshed`, 
                          'blue', 
                          'sync-alt');
            }
        }
        
        // Restore button
        refreshButton.disabled = false;
        refreshButton.innerHTML = originalButtonText;
        
        // Show success message
        const timestamp = new Date().toLocaleTimeString();
        console.log(`Dispenser status refreshed at ${timestamp}`);
    }, 1000);
}

// Add new activity to the activity list
function addActivity(title, description, colorClass, iconClass) {
    const activityList = document.querySelector('.activity-list');
    
    if (!activityList) return;
    
    // Create new activity item
    const newActivity = document.createElement('div');
    newActivity.className = 'activity-item';
    
    // Get current time
    const now = new Date();
    const timeString = `Today, ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
    
    // Set activity HTML
    newActivity.innerHTML = `
        <div class="activity-icon ${colorClass}">
            <i class="fas fa-${iconClass}"></i>
        </div>
        <div class="activity-content">
            <h4>${title}</h4>
            <p>${description}</p>
            <span class="activity-time">${timeString}</span>
        </div>
    `;
    
    // Insert at the top of the list
    activityList.insertBefore(newActivity, activityList.firstChild);
    
    // Remove oldest activity if there are more than 4
    if (activityList.children.length > 4) {
        activityList.removeChild(activityList.lastChild);
    }
}

// Simulate notifications
function simulateNotifications() {
    // Set up recurring notifications for demo purposes
    setInterval(() => {
        // Random chance to create a notification
        if (Math.random() < 0.05) { // 5% chance every check
            const badge = document.querySelector('.notification-badge');
            
            if (badge) {
                // Increment notification count
                let count = parseInt(badge.textContent);
                count++;
                badge.textContent = count;
                badge.style.display = 'flex';
                
                // Add a notification sound effect (commented out for demo)
                // const audio = new Audio('notification.mp3');
                // audio.play();
                
                // Show what the notification would be about
                console.log('New notification: Upcoming medication reminder');
            }
        }
    }, 30000); // Check every 30 seconds
}