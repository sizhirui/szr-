// 数列类型切换
document.getElementById('sequenceType').addEventListener('change', function() {
    const type = this.value;
    
    // 隐藏所有输入区域
    document.getElementById('arithmeticInputs').classList.add('hidden');
    document.getElementById('geometricInputs').classList.add('hidden');
    document.getElementById('squareInputs').classList.add('hidden');
    
    // 显示对应输入区域
    document.getElementById(type + 'Inputs').classList.remove('hidden');
});

// 计算求和
function calculateSum() {
    const type = document.getElementById('sequenceType').value;
    let result = 0;
    let formula = '';
    let steps = [];
    
    switch(type) {
        case 'arithmetic':
            const a1 = parseFloat(document.getElementById('a1').value);
            const d = parseFloat(document.getElementById('d').value);
            const n = parseInt(document.getElementById('n').value);
            
            result = n * (2 * a1 + (n - 1) * d) / 2;
            formula = `Sₙ = n × [2a₁ + (n-1)d] / 2`;
            steps = [
                `首项 a₁ = ${a1}`,
                `公差 d = ${d}`,
                `项数 n = ${n}`,
                `末项 aₙ = a₁ + (n-1)d = ${a1} + (${n}-1)×${d} = ${a1 + (n-1) * d}`,
                `Sₙ = ${n} × (${a1} + ${a1 + (n-1) * d}) / 2 = ${result}`
            ];
            break;
            
        case 'geometric':
            const ga1 = parseFloat(document.getElementById('ga1').value);
            const r = parseFloat(document.getElementById('r').value);
            const gn = parseInt(document.getElementById('gn').value);
            
            if (r === 1) {
                result = ga1 * gn;
                formula = `Sₙ = n × a₁ (当 r = 1 时)`;
            } else {
                result = ga1 * (1 - Math.pow(r, gn)) / (1 - r);
                formula = `Sₙ = a₁ × (1 - rⁿ) / (1 - r)`;
            }
            steps = [
                `首项 a₁ = ${ga1}`,
                `公比 r = ${r}`,
                `项数 n = ${gn}`,
                `${formula}`,
                `Sₙ = ${ga1} × (1 - ${r}^${gn}) / (1 - ${r}) = ${result}`
            ];
            break;
            
        case 'square':
            const sn = parseInt(document.getElementById('sn').value);
            result = sn * (sn + 1) * (2 * sn + 1) / 6;
            formula = `Sₙ = n(n+1)(2n+1) / 6`;
            steps = [
                `项数 n = ${sn}`,
                `${formula}`,
                `Sₙ = ${sn} × ${sn + 1} × ${2 * sn + 1} / 6 = ${result}`
            ];
            break;
    }
    
    displayResult(result, formula, steps);
}

// 显示结果
function displayResult(result, formula, steps) {
    const display = document.getElementById('resultDisplay');
    
    let html = `
        <p class="final-result">Σ = ${result}</p>
        <p style="margin-top: 15px; font-weight: 600; color: #00d9ff;">公式：${formula}</p>
        <div style="margin-top: 15px; text-align: left; background: rgba(0,0,0,0.3); padding: 12px; border-radius: 6px;">
            <p style="color: #64ffda; font-size: 0.75rem; margin-bottom: 8px;">计算步骤：</p>
    `;
    
    steps.forEach((step, index) => {
        html += `<p style="font-size: 0.8rem; color: #a8b2d1; margin: 4px 0;">${index + 1}. ${step}</p>`;
    });
    
    html += '</div>';
    
    display.innerHTML = html;
}

// 页面加载时显示默认输入区域
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('arithmeticInputs').classList.remove('hidden');
});