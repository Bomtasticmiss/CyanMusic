import { getSong } from '@/Api/api_song'

function useGetSong() {
    const getSongUrl = async (SongId) => {
        // console.log(SongId)
        const res = await getSong(SongId)
        console.log(res)
        return res.data[0].url;
    } 

    return {getSongUrl}
}

export default useGetSong