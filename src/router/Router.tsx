import { memo, VFC } from "react";
import { Switch, Route } from "react-router-dom";

import { Login } from "../components/pages/Login";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { LoginUserProvider } from "../providers/LoginUserProvider";
import { homeRoutes } from "./HomeRoutes";

export const Router: VFC = memo(() => {
  return (
    <Switch>
      <LoginUserProvider>
        <Route exact path="/">
          <Login />
        </Route>
        {/* home配下のルーティングはHomeRoutes.tsxに記載 */}
        {/* /homeはpropsのmatchの{url}に入っている。 */}
        <Route
          path="/home"
          render={({ match: { url } }) => (
            <Switch>
              {homeRoutes.map((route) => (
                <Route
                  key={route.path}
                  exact={route.exact}
                  path={`${url}${route.path}`}
                >
                  {/* /home のみにヘッダーを付ける */}
                  <HeaderLayout>{route.children}</HeaderLayout>
                </Route>
              ))}
            </Switch>
          )}
        />
        {/* エラーページの指定 ここだけだと/homeから始まる存在しないURLには対応できない */}
      </LoginUserProvider>
      <Route path="*">
          <Page404 />
        </Route>
    </Switch>
  );
});
