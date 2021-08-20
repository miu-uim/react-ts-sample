import { useMessage } from "./useMessage";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";
import axios from "axios";

import { User } from "../types/api/user";
import { useLoginUser } from "./useLoginUser";

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const [loading, setLoading] = useState(false);

  const login = useCallback(
    (id: string) => {
      setLoading(true);
      axios
        .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (res.data) {
            const isAdmin =res.data.id ===10 ? true: false
            // ログイン成功時
            // contextにログイン情報を追加

            // スプレッド構文でオブジェクトの中身を一度開いてisAdminを追加する。
            setLoginUser({...res.data, isAdmin:isAdmin});
            showMessage({ title: "ログインしました", status: "success" });
            history.push("/home");
          } else {
            showMessage({ title: "ユーザーが見つかりません", status: "error" });
            setLoading(false); 
          }
        })
        .catch(() =>{
          showMessage({ title: "ログインできません", status: "error" })
          setLoading(false); 
        });
    },
    [history, showMessage, setLoginUser]
  );

  return { login, loading };
};
