import { useEffect } from 'react';
import { useEndlinkToken } from './components/EndlinkContext';
import { LinkButton } from './components/LinkButton';

function EndlinkLandingPage() {
  const { endlinkToken, setEndlinkToken } = useEndlinkToken();

  useEffect(() => {
    const endlinkToken = getEndlinkTokenFromParams();
    if (endlinkToken) {
      setEndlinkToken(endlinkToken);
    }
  }, []);

  return (
    <div>
      <div className='relative flex flex-col items-start sm:items-center sm:text-center text-gray-300'>
        <div className='font-sans font-light !text-center mt-4 sm:mt-6 md:mt-8 lg:mt-10 text-2xl  xs:text-3.5xl sm:text-4xl md:text-5.5xl !tracking-[-.045em] relative text-navy mb-4  '>
          This is the landing page
          <br className='hidden md:block ' /> for a
          <span className='text-tartleGreen-400'> TARTLE</span> endlink flow
          <br className='hidden md:block lg:hidden' /> in a single page app
          (SPA).
        </div>
        <p className='font-kablammo text-base lg:text-lg tracking-prose max-w-lg lg:max-w-2xl mx-auto'>
          {endlinkToken
            ? 'We successfully retrieved an endlink token from the url params with the following value'
            : 'There was no endlink token on the url params, you must land here from a TARTLE packet.'}
        </p>
        {endlinkToken ? (
          <div className='bg-gray-800 mt-4 mb-4 text-white px-4 py-2 rounded font-mono text-xs sm:text-sm lg:text-base mx-auto'>
            {endlinkToken}
          </div>
        ) : null}
        <p className='text-base pt-2 lg:text-lg tracking-prose mb-2 max-w-lg lg:max-w-2xl mx-auto'>
          Although in this example we're saving the token to react state (in
          memory) only, you could adapt the context to instead save the token to
          the database if your requirements demand retrieval beyond this session
          for example.{' '}
          <span className='block mt-4'>
            In this example, the requirement is the user giving us their name.
          </span>
        </p>
        <LinkButton to='/form' disabled={!endlinkToken} />
        {/* <Link
          to='/form'
          className='flex items-baseline self-center mt-4 gap-2 rounded-full text-white bg-tartleGreen-400 px-4 py-2'
        >
          Continue the flow
          <div className='flex items-center opacity-50 group-hover/btn:opacity-100 transition-opacity'>
            <ArrowRight />
          </div>
        </Link>*/}
      </div>
    </div>
  );
}

export default EndlinkLandingPage;

const getEndlinkTokenFromParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get('tartle_endlink_token') || null;
};
