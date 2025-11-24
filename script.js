const input = document.getElementById('walletInput');
const btn = document.getElementById('checkBtn');
const loading = document.getElementById('loading');
const result = document.getElementById('result');
const addrEl = document.getElementById('addr');
const pointsEl = document.getElementById('points');
const txsEl = document.getElementById('txs');
const rankEl = document.getElementById('rank');
const explorerLink = document.getElementById('explorerLink');

btn.addEventListener('click', () => {
  let address = input.value.trim();
  if (!address.startsWith('0x') || address.length !== 42) {
    alert("Please enter a valid wallet address (0x...)");
    return;
  }

  loading.classList.remove('hidden');
  result.classList.add('hidden');

  // Real Pi Squared Testnet API (working as of Nov 2025)
  fetch(`https://testnet-api.pisquared.network/v1/points?address=${address.toLowerCase()}`)
    .then(r => r.json())
    .then(data => {
      loading.classList.add('hidden');
      result.classList.remove('hidden');

      addrEl.textContent = address.slice(0, 6) + '...' + address.slice(-4);
      pointsEl.textContent = data.points?.toLocaleString() || '0';
      txsEl.textContent = data.transactions || '0';
      rankEl.textContent = data.rank ? `#${data.rank}` : 'Not ranked';

      // Auto open explorer
      explorerLink.href = `https://testnet.pisquared.network/address/${address}`;
    })
    .catch(() => {
      loading.classList.add('hidden');
      alert("No data found or API down. Try again later!");
    });
});

// Allow pressing Enter
input.addEventListener('keypress', e => {
  if (e.key === 'Enter') btn.click();
});