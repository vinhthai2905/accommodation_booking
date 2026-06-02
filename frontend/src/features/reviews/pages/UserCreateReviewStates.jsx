import HotelReviewLoading from "../components/HotelReviewLoading"
import HotelReviewError from "../components/HotelReviewError"
import HotelReviewSuccess from "../components/HotelReviewSuccess"

export default function UserCreateReviewStates({ createReviewMutation, navigate }) {
    if (createReviewMutation.isPending) {
        return <HotelReviewLoading />
    }

    if (createReviewMutation.isError) {
        return <HotelReviewError error={createReviewMutation.error} onRetry={() => createReviewMutation.reset()} />
    }

    if (createReviewMutation.isSuccess) {
        return <HotelReviewSuccess navigate={navigate} />
    }
}