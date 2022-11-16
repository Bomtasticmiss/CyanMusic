import { getSong } from '@/Api/musicHomeList'

function useGetSong() {
    const getSongUrl = async (SongId) => {
        const res = await getSong(SongId)
        // console.log(res)
        return res.data[0].url;
    } 

    return {getSongUrl}
}

export default useGetSong