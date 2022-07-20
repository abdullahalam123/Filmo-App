import React, { useContext, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { ColorModeContext } from '../utils/ToggleColorMode';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchMovie, selectCategory } from '../features/categorySlice';
import { fetchToken } from '../utils';

const useAlan = () => {
	const { setMode } = useContext(ColorModeContext);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		alanBtn({
			key: '95769de3113dee37e72f538f04f7a90b2e956eca572e1d8b807a3e2338fdd0dc/stage',
			onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
				if (command === 'chooseGenre') {
					const foundGenre = genres.find(
						(g) => g.name.toLowerCase() === genreOrCategory.toLowerCase());

					if (foundGenre) {
						navigate('/');

						dispatch(selectCategory(foundGenre.id));
					} 
					else {
						const category = genreOrCategory.startsWith('top') ? 'top_rated': genreOrCategory;
						navigate('/');
						dispatch(selectCategory(category));
					}
				} else if (command === 'changeMode') {
					if (mode === 'light') {
						setMode('light');
					} else {
						setMode('dark');
					}
				} else if (command === 'login') {
					fetchToken();
				} else if (command === 'logout') {
					localStorage.clear();
					window.location.href = '/';

				} else if (command === 'search') {
					dispatch(searchMovie(query));
				}
			},
		});
	}, []);
};

export default useAlan;
