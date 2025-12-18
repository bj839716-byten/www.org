// Live Terminal Content Array
const codeSnippets = [
    "function voidLoop() {",
    "  if (testing_active) {",
    "    runTests(); // Asserting...",
    "  }",
    "}",
    "// Selenium Protocol Initiated",
    "driver.find('selector').click();",
    "expect(page).to.have.title('VOID');",
    "// Jest: Test Passed [0.4s]"
];

let lineIndex = 0;
const terminal = document.getElementById('terminal-text');

// Function to feed code into the terminal
function updateTerminal() {
    const line = document.createElement('div');
    line.style.opacity = "0.7";
    line.innerHTML = `> ${codeSnippets[lineIndex % codeSnippets.length]}`;
    terminal.appendChild(line);
    lineIndex++;
    
    // Auto-scroll
    terminal.scrollTop = terminal.scrollHeight;
    
    // Limit lines
    if (terminal.childNodes.length > 15) {
        terminal.removeChild(terminal.firstChild);
    }
}

// Run terminal updates every second
setInterval(updateTerminal, 1200);

// Interaction for the "Re-run Suite" button
function scrambleText() {
    const btn = document.querySelector('.cyber-btn');
    btn.innerHTML = "EXECUTING...";
    setTimeout(() => {
        btn.innerHTML = "SUITE_COMPLETE";
        setTimeout(() => btn.innerHTML = "RE-RUN SUITE", 2000);
    }, 1500);
}