/* eslint-disable react-hooks/exhaustive-deps */

import { useMessage } from "./useMessage";
import axios from "axios";
import { User } from "./../types/api/user";
import { useCallback, useState } from "react";

export const useAllUsers = () => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);
  // usersの初期値に空配列を指定しないと、UserManagementでmapできない。
  const [users, setUsers] = useState<Array<User>>([]);

  const getUsers = useCallback(() => {
    setLoading(true);
    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch(() => {
        showMessage({
          title: "ユーザー情報取得に失敗しました",
          status: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { getUsers, loading, users };
};
