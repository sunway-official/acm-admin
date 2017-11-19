import functions from './functions';
import queries from './queries';

export const addActivityFunc = data => {
  const {
    INSERT_ACTIVITY_MUTATION,
    conferenceId,
    values,
    INSERT_SCHEDULE_MUTATION,
  } = data;
  INSERT_ACTIVITY_MUTATION({
    variables: {
      conference_id: conferenceId,
      title: values.title,
      description: values.description,
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
            activity_id: data.insertActivity.id,
            room_id: schedule.room,
            conference_id: conferenceId,
            start: newStarTime,
            end: newEndTime,
          },
          refetchQueries: [
            {
              query: queries.GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY,
              variables: { conference_id: conferenceId },
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
