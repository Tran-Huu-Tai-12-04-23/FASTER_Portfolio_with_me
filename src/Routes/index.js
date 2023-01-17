import { Home, CreatePortfolio, TemplateContent } from "~/Components";
import {
    DefaultItemInGridTemplate1,
    DefaultComponentPages1,
} from "~/Routes/ComponentDefault/ComponentDefaults1";
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
                heightDefault={2000}
                id='template-1'
                DefaultComponent={DefaultItemInGridTemplate1}
                DefaultComponentPages={DefaultComponentPages1}
            >
                <TemplateContent
                    DefaultComponentPages={DefaultComponentPages1}
                    // DefaultComponent={DefaultItemInGridTemplate1}
                />
            </CreatePortfolio>
        ),
        path: "/template1",
    },
    {
        element: (
            <CreatePortfolio
                id='template-2'
                DefaultComponent={DefaultItemInGridTemplate2}
                heightDefault={3000}
            >
                <TemplateContent />
            </CreatePortfolio>
        ),
        path: "/template2",
    },
    {
        element: (
            <CreatePortfolio
                id='template-3'
                DefaultComponent={DefaultItemInGridTemplate3}
                heightDefault={3000}
            >
                <TemplateContent />
            </CreatePortfolio>
        ),
        path: "/template3",
    },
    {
        element: (
            <CreatePortfolio
                id='template-4'
                DefaultComponent={DefaultItemInGridTemplate4}
                heightDefault={3000}
            >
                <TemplateContent />
            </CreatePortfolio>
        ),
        path: "/template4",
    },
    {
        element: (
            <CreatePortfolio
                id='template-5'
                DefaultComponent={DefaultItemInGridTemplate5}
                heightDefault={3000}
            >
                <TemplateContent />
            </CreatePortfolio>
        ),
        path: "/template5",
    },
];
