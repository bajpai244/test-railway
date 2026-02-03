<script>
  // API endpoint from environment variable, with fallback
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  
  let num1 = '';
  let num2 = '';
  let result = null;
  let loading = false;
  let error = '';
  
  async function addNumbers() {
    error = '';
    result = null;
    
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    
    if (isNaN(a) || isNaN(b)) {
      error = 'Please enter valid numbers';
      return;
    }
    
    loading = true;
    
    try {
      const response = await fetch(`${API_URL}/api/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ a, b }),
      });
      
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to add numbers');
      }
      
      const data = await response.json();
      result = data.result;
    } catch (err) {
      error = err.message || 'Error connecting to server';
    } finally {
      loading = false;
    }
  }
</script>

<div class="add-container">
  <div class="input-group">
    <input
      type="number"
      placeholder="First number"
      bind:value={num1}
      on:keydown={(e) => e.key === 'Enter' && addNumbers()}
    />
    <span class="plus">+</span>
    <input
      type="number"
      placeholder="Second number"
      bind:value={num2}
      on:keydown={(e) => e.key === 'Enter' && addNumbers()}
    />
  </div>
  
  <button on:click={addNumbers} disabled={loading}>
    {loading ? 'Adding...' : 'Add'}
  </button>
  
  {#if error}
    <div class="error">{error}</div>
  {/if}
  
  {#if result !== null}
    <div class="result">
      <span class="result-label">Result:</span>
      <span class="result-value">{result}</span>
    </div>
  {/if}
  
  <div class="api-info">
    API: {API_URL}
  </div>
</div>

<style>
  .add-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    padding: 2rem;
    background: #1a1a1a;
    border-radius: 12px;
    min-width: 300px;
  }
  
  .input-group {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  input {
    padding: 0.75rem 1rem;
    font-size: 1.2rem;
    border: 2px solid #444;
    border-radius: 8px;
    background: #333;
    color: white;
    width: 140px;
    text-align: center;
  }
  
  input:focus {
    outline: none;
    border-color: #646cff;
  }
  
  .plus {
    font-size: 1.5rem;
    font-weight: bold;
    color: #888;
  }
  
  button {
    padding: 0.75rem 2rem;
    font-size: 1.1rem;
    font-weight: 600;
    background: #646cff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  button:hover:not(:disabled) {
    background: #535bf2;
  }
  
  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .error {
    color: #ff6b6b;
    padding: 0.75rem 1rem;
    background: rgba(255, 107, 107, 0.1);
    border-radius: 8px;
    border: 1px solid rgba(255, 107, 107, 0.3);
  }
  
  .result {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    background: rgba(100, 108, 255, 0.1);
    border-radius: 8px;
    border: 2px solid #646cff;
  }
  
  .result-label {
    font-size: 1.1rem;
    color: #888;
  }
  
  .result-value {
    font-size: 2rem;
    font-weight: bold;
    color: #646cff;
  }
  
  .api-info {
    font-size: 0.8rem;
    color: #666;
    margin-top: 0.5rem;
  }
</style>
