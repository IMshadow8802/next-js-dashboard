import axios from 'axios';
import useDataStore from './store';

async function fetchDataAndSet() {
  try {
    const response = await axios.post(
      'http://103.30.72.63/eCRM/api/Board/fetchBoard',
      { BoardId: 0 }
    );
    const data = response.data;
    //console.log(data);
    useDataStore.setState({ data });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function fetchBoardDataById(boardId) {
    try {
      const response = await axios.post(
        'http://103.30.72.63/eCRM/api/Board/fetchBoard',
        { BoardId: boardId }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching board data:', error);
      return null;
    }
  }

export { fetchDataAndSet,fetchBoardDataById };
