import { useState } from 'react';
import HighlightContainer from './components/HighlightContainer';
import { FoodIcon } from './components/SVG';
import { LinkButton } from './components/LinkButton';

function FormPage() {
  const [name, setName] = useState('');

  return (
    <div className='relative font-extralight text-base lg:text-lg  container h-full mx-auto py-24 xl:py-32 px-4 sm:px-6 lg:px-8 md:text-2xl grid items-center '>
      <div className='grid gap-10 '>
        <div className='text-center'>
          You could collect information and save it to your system.
        </div>
        <HighlightContainer className='max-w-2xl mx-auto'>
          <label htmlFor='food' className='block text-sm/6 font-medium'>
            What did you eat this morning?
          </label>
          <div className='mt-2 grid grid-cols-1'>
            <input
              type='text'
              name='food'
              id='food'
              className='col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-10 pr-3 outline -outline-offset-1 text-gray-700 outline-gray-300 placeholder:text-gray-400 focus:-outline-offset-2 focus:outline-indigo-600 sm:pl-9 text-sm/6'
              placeholder='Eggs and toast'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FoodIcon />
          </div>
        </HighlightContainer>
        <div className='text-center'>
          Choose the method for calling the endlink endpoints you want to try.
        </div>
        <div className='flex gap-4 w-fit mx-auto'>
          <LinkButton to='/completion-requests' disabled={!name}>
            Use network requests
          </LinkButton>
          <LinkButton to='/completion-redirects' disabled={!name}>
            Use redirects
          </LinkButton>
        </div>
      </div>
    </div>
  );
}

export default FormPage;

const getEndlinkTokenFromParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get('tartle_endlink_token') || null;
};
