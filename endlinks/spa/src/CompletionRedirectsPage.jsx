import { useState } from 'react';
import { useEndlinkToken } from './components/EndlinkContext';
import HighlightContainer from './components/HighlightContainer';
import { LinkButton } from './components/LinkButton';

const actions = ['complete', 'quota full', 'fail', 'screenout'];
const endpoints = {
  complete: 'api/v3/endlinks/complete.html',
  'quota full': 'api/v3/endlinks/quota_full.html',
  fail: 'api/v3/endlinks/fail.html',
  screenout: 'api/v3/endlinks/screenout.html'
};

function CompletionRedirectsPage() {
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
                        endpoint by clicking one of the links below.
                      </div>
                      <div className='grid grid-cols-2 w-fit gap-2 mx-auto mt-2'>
                        {actions.map((action) => (
                          <div key={action} className='flex  gap-2'>
                            <a
                              className='flex cursor-pointer w-full justify-center items-center mt-4 gap-2 rounded-full text-white hover:bg-tartleGreen-400 px-4 py-2 bg-tartleGreen-400/90 transition-colors duration-200 sm:text-sm lg:text-base text-xs'
                              href={buildEndpointUrl(action, endlinkToken)}
                            >
                              {action}
                            </a>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : null}
              <HighlightContainer className='w-fit mx-auto break-words mt-6 text-left text-xs align-center'>
                <pre className='text-xs pt-0 mt-0 align-center'>
                  {`// Example for complete endpoint\n`}
                  {`const url = new URL(\n\r\t'/${endpoints[actionSelected]}?' +\n\r\tnew URLSearchParams({ tartle_endlink_token }),\n\r\t'http://localhost:3000'\n\r);\n\n`}
                  {`\<a rel='noopener noreferrer' href=\{url\}>${actionSelected}</a>`}
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

export default CompletionRedirectsPage;

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
