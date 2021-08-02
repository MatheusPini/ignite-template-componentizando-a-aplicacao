import { useEffect, useState } from 'react';
import { Button } from '../../components/ViewComponents/Buttons/SimpleButton/Button';
import { api } from '../../services/api';

import '../../styles/global.scss';

import { SideBar } from '../../components/ViewContent/SideBar';
import { Content } from '../../components/ViewContent/Content';
import GenreResponseProps from "../../components/Interfaces/IGenreResponseProps"
import MovieProps from "../../components/Interfaces/IMovieProps"

export function Index() {
    const [selectedGenreId, setSelectedGenreId] = useState(1);

    const [genres, setGenres] = useState<GenreResponseProps[]>([]);

    const [movies, setMovies] = useState<MovieProps[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

    useEffect(() => {
        api.get<GenreResponseProps[]>('genres').then(response => {
            setGenres(response.data);
        });
    }, []);

    useEffect(() => {
        api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
            setMovies(response.data);
        });

        api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
            setSelectedGenre(response.data);
        })
    }, [selectedGenreId]);

    function handleClickButton(id: number) {
        setSelectedGenreId(id);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <SideBar>
                {genres.map(genre => (
                    <Button
                        key={String(genre.id)}
                        title={genre.title}
                        iconName={genre.name}
                        onClick={() => handleClickButton(genre.id)}
                        selected={selectedGenreId === genre.id}
                    />
                ))}
            </SideBar>
            <Content selectedGenre={selectedGenre} movies={movies} />
        </div>
    )
}