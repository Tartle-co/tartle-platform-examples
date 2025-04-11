import { useState } from 'react';
import { useEndlinkToken } from './components/EndlinkContext';
import HighlightContainer from './components/HighlightContainer';

const actions = ['complete', 'quota full', 'fail', 'screenout'];
const endpoints = {
  complete: 'api/v3/endlinks/complete',
  'quota full': 'api/v3/endlinks/quota_full',
  fail: 'api/v3/endlinks/fail',
  screenout: 'api/v3/endlinks/screenout'
};

function CompletionRequestsPage() {
  const { endlinkToken } = useEndlinkToken();
  const [actionSelected, setActionSelected] = useState('complete');
  const [result, setResult] = useState('');

  const url = buildEndpointUrl(actionSelected, endlinkToken);

  return (
    <div>
      <div className='relative font-extralight text-base lg:text-lg  container h-full mx-auto py-24 xl:py-32 px-4 sm:px-6 lg:px-8 md:text-2xl grid items-center '>
        <div className='grid gap-10 text-base'>
          {!endlinkToken ? (
            'There was no endlink token saved in context, you must land here from the landing page.'
          ) : (
            <div className='text-center'>
              <h1 className='text-2xl font-bold'>
                Finally, close the loop with TARTLE
              </h1>
              <p className='tracking-prose max-w-lg lg:max-w-2xl mx-auto '>
                {endlinkToken
                  ? "At the end of your flow, you'll retrieve the token from context (or your method of choice). In this case, the token in context is"
                  : 'There was no endlink token saved in context, you must land here from the landing page.'}
              </p>
              {endlinkToken ? (
                <>
                  <div className='bg-gray-800 mt-4 mb-4 w-fit text-white px-4 py-2 rounded font-mono text-xs sm:text-sm lg:text-base mx-auto'>
                    {endlinkToken}
                  </div>
                  {result ? (
                    <HighlightContainer>
                      <pre>{result}</pre>
                    </HighlightContainer>
                  ) : (
                    <>
                      <div>
                        Then you can make a fetch call to the appropriate
                        endpoint.
                      </div>
                      <div className='grid grid-cols-2 w-fit gap-4 mx-auto mt-6'>
                        {actions.map((action) => (
                          <div key={action} className='flex items-center gap-2'>
                            <input
                              type='radio'
                              id={action}
                              name='action'
                              value={action}
                              checked={actionSelected === action}
                              onChange={() => setActionSelected(action)}
                              className='w-4 h-4'
                            />
                            <label htmlFor={action} className='capitalize'>
                              {action}
                            </label>
                          </div>
                        ))}
                      </div>
                      <button
                        className='hover:bg-tartleGreen-400 cursor-pointer bg-tartleGreen-400/90 transition-colors text-white px-4 py-2 rounded-full font-mono text-xs sm:text-sm lg:text-base mx-auto mt-6'
                        onClick={() => {
                          callEndpoint(actionSelected, endlinkToken)
                            .then(() => {
                              setResult('Endpoint was called successfully');
                            })
                            .catch((e) => {
                              setResult(e.message);
                            });
                        }}
                      >
                        Send
                      </button>
                    </>
                  )}
                </>
              ) : null}
              <HighlightContainer className='w-fit mx-auto break-words mt-6 text-left text-xs align-center'>
                <pre className='text-xs pt-0 mt-0 align-center'>
                  {`const url = new URL(\n\r\t'/${endpoints[actionSelected]}?' +\n\r\tnew URLSearchParams({ tartle_endlink_token }),\n\r\t'http://localhost:3000'\n\r);\n\n`}
                  {`fetch(url.toString(), { method: 'GET' });`}
                </pre>
                {/* <span className='flex'>fetch(tartleBaseUrl + endpointPath, { method: 'GET' })"}</span> */}
              </HighlightContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompletionRequestsPage;

const callEndpoint = async (action, endlinkToken) => {
  const url = buildEndpointUrl(action, endlinkToken);

  return fetch(url.toString(), {
    method: 'GET'
  }).then(async (res) => {
    if (!res.ok) {
      try {
        const json = await res.json();
        throw new Error(json.error);
      } catch (e) {
        throw new Error(`Failed to call endpoint: ${res.status}`);
      }
    }
  });
};

const buildEndpointUrl = (action, endlinkToken) => {
  return new URL(
    endpoints[action] + '?tartle_endlink_token=' + endlinkToken,
    process.env.VITE_TARTLE_BASE_URL || 'http://localhost:3000'
  );
};

// new URL(
//   '/v3/endlinks/complete?' + new URLSearchParams({ tartle_endlink_token }),
//   'http://localhost:3000'
// );
