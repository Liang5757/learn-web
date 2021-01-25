/*
	�ļ�ϵͳ��File System��
		- �ļ�ϵͳ����˵����ͨ��Node������ϵͳ�е��ļ�
		- ʹ���ļ�ϵͳ����Ҫ������fsģ�飬fs�Ǻ���ģ�飬ֱ�����벻��Ҫ����

	ͬ���ļ���д��
		- �ֶ������Ĳ���
			1.���ļ�
 				fs.openSync(path, flags[, mode])
 					- path Ҫ���ļ���·��
 					- flags ���ļ�Ҫ���Ĳ���������
 						r ֻ����
 						w ��д��
 					- mode �����ļ��Ĳ���Ȩ�ޣ�һ�㲻��
				 ����ֵ��
				 - �÷����᷵��һ���ļ�����������Ϊ��������ǿ���ͨ���������������ļ����и��ֲ���

			2.���ļ���д������
 				fs.writeSync(fd, string[, position[, encoding]])
 					- fd �ļ�������������Ҫ����Ҫд����ļ���������
 					- string Ҫд�������
 					- position д�����ʼλ��
 					- encoding д��ı��룬Ĭ��utf-8

			3.���沢�ر��ļ�
 				fs.closeSync(fd)
 					- fd Ҫ�رյ��ļ���������
 */

let fs = require("fs");

let fd = fs.openSync("hello_fs.txt", "w");
console.log("�ļ���������:" + fd);    // 3 �ļ����Ϊ3(�ļ���������)

// д���ļ�
fs.writeSync(fd, "�����ˣ����룡");

// �ر��ļ�
fs.closeSync(fd);

/*
    �첽�ļ�д��
        fs.open(path, flags[, mode], callback)
        - ������һ���ļ�
        - �첽���õķ������������ͨ���ص������Ĳ������ص�
        - �ص���������������
            err ����������û�д�����Ϊnull
            fd  �ļ���������

        fs.write(fd, string[, position[, encoding]], callback)
        - �����첽д��һ���ļ�

        fs.close(fd, callback)
        - �����ر��ļ�

        node���첽�����Իص���������ʽ������
*/

fs.open("hello_fs2.txt", "w", function (err, fd) {
    // �ж��Ƿ����
    if (err) {
        console.log(err);
    } else {
        // written: ָ��������ַ�����д������ֽ�
        fs.write(fd, "This is an asynchronous write file", 2,function (err, written, string) {
            if (!err) {
                console.log("success!");
            } else {
                console.log(err);
            }
            //�ر��ļ�
            fs.close(fd , function (err) {
                if(!err){
                    console.log("�ļ��ѹر�~~~");
                }
            });
        })
    }
});
console.log("keep execute!");

/*
	���ļ�д��
    fs.writeFile(file, data[, options], callback)
    fs.writeFileSync(file, data[, options])
        - file Ҫ�������ļ���·��
        - data Ҫд�������
        - options ѡ����Զ�д�����һЩ����
            -encoding <string> | <null> Ĭ��ֵ: 'utf8'
            -mode <integer> Ĭ��ֵ: 0o666
            -flag <string> ����֧�ֵ��ļ�ϵͳ��־��Ĭ��ֵ: 'w'
        - callback ��д������Ժ�ִ�еĺ���
 */

fs.writeFile("hello_fs3.txt","����ͨ��writeFileд�������",{flag:"w"} , function (err) {
    if(!err){
        console.log("writeFile~~~");
    }else{
        console.log(err);
    }
});

/*
    ��ʽ�ļ�д��
        ����һ����д��
        fs.createWriteStream(path[, options])
            - ������������һ����д��
            - path���ļ�·��
            - options ���õĲ���
 */

let ws = fs.createWriteStream("hello_ws.txt");

//����ͨ����������open��close�¼����������Ĵ򿪺͹ر�
/*
	on(�¼��ַ���,�ص�����)
		- ����Ϊ�����һ���¼�

	once(�¼��ַ���,�ص�����)
		- ����Ϊ�����һ��һ���Ե��¼������¼������ڴ���һ���Ժ��Զ�ʧЧ
**/
ws.once("open",function () {
    console.log("������~~~");
});

ws.once("close",function () {
    console.log("���ر���~~~");
});

//ͨ��ws���ļ����������
ws.write("ͨ����д��д���ļ�������");
ws.write("���������治��");
ws.write("�����յ���");
ws.write("���Ʋ�����");
ws.write("������Ư��");

//�ر���
ws.end();

/*
	1.ͬ���ļ���ȡ
	2.�첽�ļ���ȡ
	3.���ļ���ȡ
	 fs.readFile(path[, options], callback)
	 fs.readFileSync(path[, options])
	 	- path Ҫ��ȡ���ļ���·��
	 	- options ��ȡ��ѡ��
	 	- callback�ص�������ͨ���ص���������ȡ�����ݷ���(err , data)
	 		err �������
	 		data ��ȡ�������ݣ��᷵��һ��Buffer
	4.��ʽ�ļ���ȡ
 */

// ���һ�����ƹ���
fs.readFile("hello_fs.txt", function (err, data) {
    if (!err) {
        fs.writeFile("hello_readFile.txt", data, function(err){
            if(!err){
                console.log("success copy!");
            }
        } );
    }
});

/*
	��ʽ�ļ���ȡҲ������һЩ�Ƚϴ���ļ������Էֶ�ν��ļ���ȡ���ڴ���
 */
//����һ���ɶ���
const rs = fs.createReadStream("hello_fs.txt");
//����һ����д��
const ws2 = fs.createWriteStream("hello_rs.txt");

//pipe()���Խ��ɶ����е����ݣ�ֱ���������д����
rs.pipe(ws2);