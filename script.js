document.addEventListener('DOMContentLoaded', () => {
    const dobInput = document.getElementById('dobInput');
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBtn = document.getElementById('resetBtn'); // Get the new reset button
    const resultText = document.getElementById('result');

    calculateBtn.addEventListener('click', () => {
        const dobString = dobInput.value;

        if (!dobString) {
            resultText.textContent = "Please enter your date of birth.";
            resultText.style.color = 'red'; // Indicate an error
            return;
        }

        const dob = new Date(dobString);

        // Check if the date is valid (e.g., prevents "Invalid Date" for bad inputs)
        if (isNaN(dob.getTime())) {
            resultText.textContent = "Invalid date format. Please use a valid date.";
            resultText.style.color = 'red';
            return;
        }

        const today = new Date();
        let years = today.getFullYear() - dob.getFullYear();
        let months = today.getMonth() - dob.getMonth();
        let days = today.getDate() - dob.getDate();

        // Adjust months and years if days or months are negative
        if (days < 0) {
            months--;
            // Get the number of days in the previous month of 'today'
            // A more robust way to get days in previous month:
            const lastDayOfPrevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += lastDayOfPrevMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        // Handle future dates
        if (years < 0 || (years === 0 && months < 0) || (years === 0 && months === 0 && days < 0)) {
            resultText.textContent = "You cannot be born in the future!";
            resultText.style.color = 'red';
            return;
        }


        resultText.textContent = `You are ${years} years, ${months} months and ${days} days old.`;
        resultText.style.color = '#ffeb3b'; // Reset to yellow for success
    });

    // Event listener for the Reset button
    resetBtn.addEventListener('click', () => {
        dobInput.value = ''; // Clear the input field
        resultText.textContent = ''; // Clear the result text
        resultText.style.color = '#ffeb3b'; // Reset text color
    });
});