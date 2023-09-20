/*
SumFileSizes списал
Напишите функцию, которая принимает имена двух файлов и вызывает функцию, переданную третьим параметром и передает ей первым агрументом сумму их размеров.
Для получения рамзера файла необходимо использовать функцию getFileSize(filename, cb).
*/
let fileSizes = {
  testFile1: 65,
  testFile2: 48,
};
function getFileSize(filename, cb) {
  setTimeout(() => cb(fileSizes[filename]), Math.random() * 500);
}
function sumFileSizes(filename1, filename2, cb) {
  getFileSize(filename1, (size1) => {
    getFileSize(filename2, (size2) => {
      cb(size1 + size2);
    });
  });
}
sumFileSizes("testFile1", "testFile2", (sum) => {
  console.log("Сумма размеров файлов:", sum);
});

/*
getUsersInfo
Вам нужно написать функцию, которая получает массив всех пользователей и передает его в функцию коллбэк.
Пример использования
getUsersInfo((users) => {
  console.log(users); // [ { name: 'Alex', age: 70 }, { name: 'Elon' } ]
});
Для получения данных вам предоставлены 2 асинхронные функции
getUsersIds - Возвращает массив с идентификаторами пользователей
getUserInfo - Возвращает данные пользователя по заданному идентификатору
getUsersIds((ids) => {
  console.log(ids); // ['id2', 'id6']
});
getUserInfo('someUserId', (userInfo) => {
  console.log(userInfo); // { name: 'Alex', age: 70 }
});
Функция должна вызвать callback, переданный первым агрументом и передать туда массив данных о пользователях.
Порядок пользователей в результирующем массиве должен соответствовать порядку идентификаторов в массиве из getUsersIds
Hint: Вне платформы вы можете создать эти функции с помощью setTimeout и какого-то общего хранилица данных.
*/
const { getUserInfo, getUsersIds } = db;
function getUsersInfo(onLoad) {
  getUsersIds((ids) => {
    const users = [];
    let count = 0;

    ids.forEach((id, index) => {
      getUserInfo(id, (userInfo) => {
        users[index] = userInfo;
        count++;

        if (count === ids.length) {
          onLoad(users);
        }
      });
    });
  });
}
getUsersInfo((users) => {
  console.log(users); // [ { name: 'Alex', age: 70 }, { name: 'Elon' } ]
});
