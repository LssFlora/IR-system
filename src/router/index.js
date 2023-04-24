import { Navigate } from "react-router-dom"
import { Suspense } from "react"
import Login from "../pages/Login"
import Home from "../pages/Home"
import MainList from '../pages/MainList'
import MainStep from "../pages/MainStep"
import Registration from "../pages/Registration"
import Assessment from "../pages/Assessment"
import Settlement from "../pages/Settlement"
import Overview from "../pages/Overview"



const lazyLoading = (com) => {
    return (
        <Suspense fallback={<div>Loading</div>}>
            {com}
        </Suspense>
    )
}


export default [
    {
        path: "/",
        element: <Navigate to="/login" />
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/home",
        element: <Home />,
        children: [
            {
                path: "end",
                element: lazyLoading(<MainList />),
            },
            {
                path: "endCase/:caseId",
                element: lazyLoading(<MainStep />),
                children: [
                    {
                        path: "registration",
                        element: lazyLoading(<Registration />)
                    },
                    {
                        path: "assessment",
                        element: lazyLoading(<Assessment />)
                    },
                    {
                        path: "settlement",
                        element: lazyLoading(<Settlement />)
                    }, {
                        path: "overview",
                        element: lazyLoading(<Overview />)
                    },
                ]
            },
            {
                path: "processing",
                element: lazyLoading(<MainList />),
            },
            {
                path: "processingNew",
                element: lazyLoading(<MainStep />),
                children: [
                    {
                        path: "registration",
                        element: lazyLoading(<Registration />)
                    },
                    {
                        path: "assessment",
                        element: lazyLoading(<Assessment />)
                    },
                    {
                        path: "settlement",
                        element: lazyLoading(<Settlement />)
                    }, {
                        path: "overview",
                        element: lazyLoading(<Overview />)
                    },
                ]
            },
            {
                path: "processingCase/:caseId",
                element: lazyLoading(<MainStep />),
                children: [
                    {
                        path: "registration",
                        element: lazyLoading(<Registration />)
                    },
                    {
                        path: "assessment",
                        element: lazyLoading(<Assessment />)
                    },
                    {
                        path: "settlement",
                        element: lazyLoading(<Settlement />)
                    }, {
                        path: "overview",
                        element: lazyLoading(<Overview />)
                    },
                ]
            },
            {
                path: "done",
                element: lazyLoading(<MainList />),
            },
            {
                path: "doneCase/:caseId",
                element: lazyLoading(<MainStep />),
                children: [
                    {
                        path: "registration",
                        element: lazyLoading(<Registration />)
                    },
                    {
                        path: "assessment",
                        element: lazyLoading(<Assessment />)
                    },
                    {
                        path: "settlement",
                        element: lazyLoading(<Settlement />)
                    }, {
                        path: "overview",
                        element: lazyLoading(<Overview />)
                    },
                ]
            },
            {
                path: "*",
                element: <Navigate to="/home/processing" />
            }
        ]
    },
    {
        path: "*",
        element: <Navigate to="/login" />
    }
]