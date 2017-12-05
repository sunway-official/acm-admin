import functions from './functions';
import queries from './queries';

export const addActivityFunc = data => {
  const {
    INSERT_ACTIVITY_WITH_PAPER_ID_MUTATION,
    INSERT_SCHEDULE_MUTATION,
    values,
  } = data;
  INSERT_ACTIVITY_WITH_PAPER_ID_MUTATION({
    variables: {
      paper_id: data.values.paper,
    },
  })
    .then(({ data }) => {
      // eslint-disable-next-line array-callback-return
      values.schedules.map(schedule => {
        const newStarTime = functions.getDateTime(
          schedule.date,
          schedule.start,
        );
        const newEndTime = functions.getDateTime(schedule.date, schedule.end);
        INSERT_SCHEDULE_MUTATION({
          variables: {
            activity_id: data.insertActivityWithPaperID.id,
            room_id: schedule.room,
            start: newStarTime,
            end: newEndTime,
          },
          refetchQueries: [
            {
              query: queries.GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY,
            },
          ],
        });
      });
    })
    .catch(error => {
      console.log('there was an error sending the query', error);
    });
};

export default addActivityFunc;
