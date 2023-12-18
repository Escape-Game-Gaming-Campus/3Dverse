import { useEffect, useState } from 'react';
import LoadLogo from './load.svg';
import './loadingBar.scss';

export const LoadingBar = ({ready, loadPage}: {ready: boolean, loadPage: boolean}) => {
    const [hidden, setHidden] = useState("");
    const [completeHide, setCompleteHide] = useState(false);

    useEffect(() => {
        if (ready && loadPage) {
            setHidden('hidden');
            setTimeout(() => {
                setCompleteHide(true);
            }, 3000);
        };
    }, [ready, loadPage]);

    return !completeHide ? <div className={'loadingBar ' + hidden}>
        <img src={LoadLogo} className='loadingBar' alt='loading bar' />
    </div> : <></>;
}