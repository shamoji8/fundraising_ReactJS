import React from 'react';
 
const TYPE_NUMBER = 'NUMBER';

interface Props{data:any}
 
const TABLE_DEFINE: any = [
  { label: '名前', key: 'name' },
  { label: '資金', key: 'funds'}, // 特別なパラメータや種別をあらかじめ定義
  { label: '会社', key: 'companyName' },
  { label: 'メールアドレス', key: 'email' },
  { label: '登録日時', key: 'createdAt' },
];

 
const AccInfo: React.FC<Props> = (props) => {
  const data = props.data;
  /*
  const data = {// 実際は axios か何かで外部からとってきて props で渡されることが多いです。
    body: {
      data: [
        {
          memberId: 27,
          name: '藤本 亮介',
          funds: 62030,
          companyName: '有限会社 宇野',
          email: 'kato.naoki@example.net',
          createdAt: '2020-03-15 03:11:53',
        },
        {
          memberId: 45,
          name: '小泉ss 充cc',
          funds: 12000,
          companyName: '有限会社 宇野',
          email: 'hcccaruka.kimura@example.net',
          createdAt: '2020-03-02 23:36:23',
        },
      ],
    },
  };
  */
 
  return (
    <table>
      <thead>
        <tr>
          {/* 定義にしたがってヘッダを作成 */}
          {TABLE_DEFINE.map((def: any) => (
            <th key={def.key}>{def.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* 定義にしたがって各プロパティを呼び出して Cell を作成 */}
        {data.body.data.map((row: any) => (
          <tr key={row.memberId}>
            {TABLE_DEFINE.map((def: any) => {
              // 大半が使うデフォルトのセルをまとめて定義
              return <td key={`${row.memberId} ${def.key}`}>{row[def.key]}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AccInfo