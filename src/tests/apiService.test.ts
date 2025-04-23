import { mockSendPrompt } from '../services/apiService';

async function testMockApi() {
  console.log('Testing mock API...');
  
  try {
    // test with valid prompt
    const response = await mockSendPrompt({ prompt: 'Hello, AI!' });
    console.log('Success:', response);
    
    // test with empty prompt (should fail)
    try {
      await mockSendPrompt({ prompt: '' });
    } catch (error) {
      console.log('Expected error:', error);
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

testMockApi();
// run: npx tsx src/tests/apiService.test.ts
