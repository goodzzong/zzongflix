import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
  },
);
// connect 의 인자로 { useNewUrlParser: true } 를 적지 않으면 deprecatedError 가 발생한다.
// 조만간 없어질 거니까 뭐 이렇게 하라는 것 같은데 일단 경고 메세지가 나오는게 보기 싫어서 구글링을 통해 위의 코드를 작성해주었다.

const db = mongoose.connection;

const handleOpen = () => console.log('connected to DB');
const handleError = (error) => console.log(`Error on DB Connection:${error}`);

db.once('open', handleOpen);
db.on('error', handleError);
