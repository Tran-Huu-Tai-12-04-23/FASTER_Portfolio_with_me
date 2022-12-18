import {
  Home,
  CreatePortfolio,
  Template1Content,
  Template2Content,
  Template3Content,
  Template4Content,
  Template5Content,
} from "~/Components";
import { DefaultItemInGridTemplate1 } from "~/Routes/ComponentDefault/ComponentDefaults1";
import { DefaultItemInGridTemplate2 } from "~/Routes/ComponentDefault/ComponentDefaults2";
import { DefaultItemInGridTemplate3 } from "~/Routes/ComponentDefault/ComponentDefaults3";
import { DefaultItemInGridTemplate4 } from "~/Routes/ComponentDefault/ComponentDefaults4";
import { DefaultItemInGridTemplate5 } from "~/Routes/ComponentDefault/ComponentDefaults5";

export const publicRoutes = [
  {
    element: <Home />,
    path: "/",
  },

  {
    element: (
      <CreatePortfolio
        DefaultComponent={DefaultItemInGridTemplate1}
        heightDefault={2000}
      >
        <Template1Content />
      </CreatePortfolio>
    ),
    path: "/template1",
  },
  {
    element: (
      <CreatePortfolio
        DefaultComponent={DefaultItemInGridTemplate2}
        heightDefault={3000}
      >
        <Template2Content />
      </CreatePortfolio>
    ),
    path: "/template2",
  },
  {
    element: (
      <CreatePortfolio
        DefaultComponent={DefaultItemInGridTemplate3}
        heightDefault={3000}
      >
        <Template3Content />
      </CreatePortfolio>
    ),
    path: "/template3",
  },
  {
    element: (
      <CreatePortfolio
        DefaultComponent={DefaultItemInGridTemplate4}
        heightDefault={3000}
      >
        <Template4Content />
      </CreatePortfolio>
    ),
    path: "/template4",
  },
  {
    element: (
      <CreatePortfolio
        DefaultComponent={DefaultItemInGridTemplate5}
        heightDefault={3000}
      >
        <Template5Content />
      </CreatePortfolio>
    ),
    path: "/template5",
  },
];
